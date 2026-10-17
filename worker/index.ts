interface Env {
  RESEND_API_KEY: string;
  NOTIFY_EMAIL: string;
}

const TO_EMAIL = 'contato@chicosacolas.com.br';
const FROM_EMAIL = 'Chico Sacolas <contato@chicosacolas.com.br>';

const ALLOWED_ORIGINS = new Set([
  'https://chicosacolas.com.br',
  'https://www.chicosacolas.com.br',
  'http://localhost:4321',
]);

// Campo invisível nos formulários: humanos deixam vazio, bots costumam preencher.
const HONEYPOT_FIELD = 'website';

const FIELD_LABELS: Record<string, string> = {
  nome: 'Nome',
  empresa: 'Empresa',
  email: 'E-mail',
  whatsapp: 'WhatsApp',
  tipo: 'Tipo de sacola',
  quantidade: 'Quantidade',
  projeto: 'Projeto',
};

const MAX_LENGTH: Record<string, number> = { projeto: 3000, _source: 60 };
const DEFAULT_MAX_LENGTH = 200;
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildHtml(fields: Record<string, string>, source: string): string {
  const rows = Object.entries(fields)
    .filter(([k, v]) => v && k in FIELD_LABELS)
    .map(([k, v]) => {
      const value = escapeHtml(v).replace(/\n/g, '<br>');
      return `<tr>
        <td style="padding:10px 16px;font-weight:600;color:#5B3924;white-space:nowrap;border-bottom:1px solid #F8EFE3;">${FIELD_LABELS[k]}</td>
        <td style="padding:10px 16px;color:#2B2520;border-bottom:1px solid #F8EFE3;">${value}</td>
      </tr>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#FFF7EC;font-family:sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#fff;border:2px solid #B9824A;">
    <div style="background:#E58A3A;padding:18px 24px;">
      <h1 style="margin:0;font-size:20px;color:#fff;font-weight:700;">Novo orçamento — ${escapeHtml(source)}</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      ${rows}
    </table>
    <div style="padding:16px 24px;background:#FFF7EC;font-size:12px;color:#7A4E2A;">
      Enviado via chicosacolas.com.br
    </div>
  </div>
</body>
</html>`;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');
    const cors = corsHeaders(origin);

    if (request.method === 'OPTIONS' && url.pathname === '/api/orcamento') {
      return new Response(null, { status: origin && ALLOWED_ORIGINS.has(origin) ? 204 : 403, headers: cors });
    }

    if (request.method !== 'POST' || url.pathname !== '/api/orcamento') {
      return new Response('Not found', { status: 404 });
    }

    // Navegadores sempre mandam Origin em POST via fetch; rejeita chamadas de outros sites.
    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return jsonResponse({ ok: false, error: 'forbidden' }, 403, cors);
    }

    let fields: Record<string, string> = {};
    try {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        if (typeof value === 'string') fields[key] = value.trim();
      }
    } catch {
      return jsonResponse({ ok: false, error: 'invalid_body' }, 400, cors);
    }

    // Bot preencheu o honeypot: finge sucesso para não ensinar o bot a contornar.
    if (fields[HONEYPOT_FIELD]) {
      return jsonResponse({ ok: true }, 200, cors);
    }

    const tooLong = Object.entries(fields).some(
      ([k, v]) => v.length > (MAX_LENGTH[k] ?? DEFAULT_MAX_LENGTH),
    );
    if (!fields['nome'] || !EMAIL_RE.test(fields['email'] ?? '') || tooLong) {
      return jsonResponse({ ok: false, error: 'invalid_fields' }, 400, cors);
    }

    const source = fields['_source'] || 'Site';
    const nome = fields['nome'];
    const subject = `[Lead] ${source} — ${nome}`.replace(/[\r\n]+/g, ' ');

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [env.NOTIFY_EMAIL ?? TO_EMAIL],
          reply_to: [fields['email']],
          subject,
          html: buildHtml(fields, source),
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error('Resend error', res.status, body);
        return jsonResponse({ ok: false, error: 'send_failed' }, 500, cors);
      }

      return jsonResponse({ ok: true }, 200, cors);
    } catch (err) {
      console.error('Worker error', err);
      return jsonResponse({ ok: false, error: 'internal' }, 500, cors);
    }
  },
};

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin || !ALLOWED_ORIGINS.has(origin)) return { Vary: 'Origin' };
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function jsonResponse(body: unknown, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}
