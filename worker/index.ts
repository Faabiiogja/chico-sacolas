interface Env {
  RESEND_API_KEY: string;
  NOTIFY_EMAIL: string;
}

const TO_EMAIL = 'contato@chicosacolas.com.br';
const FROM_EMAIL = 'Chico Sacolas <contato@chicosacolas.com.br>';

const FIELD_LABELS: Record<string, string> = {
  nome: 'Nome',
  empresa: 'Empresa',
  email: 'E-mail',
  whatsapp: 'WhatsApp',
  tipo: 'Tipo de sacola',
  quantidade: 'Quantidade',
  projeto: 'Projeto',
};

function buildHtml(fields: Record<string, string>, source: string): string {
  const rows = Object.entries(fields)
    .filter(([k, v]) => v && k !== '_source')
    .map(([k, v]) => {
      const label = FIELD_LABELS[k] ?? k;
      return `<tr>
        <td style="padding:10px 16px;font-weight:600;color:#5B3924;white-space:nowrap;border-bottom:1px solid #F8EFE3;">${label}</td>
        <td style="padding:10px 16px;color:#2B2520;border-bottom:1px solid #F8EFE3;">${v}</td>
      </tr>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#FFF7EC;font-family:sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#fff;border:2px solid #B9824A;">
    <div style="background:#E58A3A;padding:18px 24px;">
      <h1 style="margin:0;font-size:20px;color:#fff;font-weight:700;">Novo orçamento — ${source}</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      ${rows}
    </table>
    <div style="padding:16px 24px;background:#FFF7EC;font-size:12px;color:#7A4E2A;">
      Enviado via chicosacolas.com
    </div>
  </div>
</body>
</html>`;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS' && url.pathname === '/api/orcamento') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST' || url.pathname !== '/api/orcamento') {
      return new Response('Not found', { status: 404 });
    }

    let fields: Record<string, string> = {};
    try {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        if (typeof value === 'string') fields[key] = value.trim();
      }
    } catch {
      return jsonResponse({ ok: false, error: 'invalid_body' }, 400);
    }

    const source = fields['_source'] ?? 'Site';
    const nome = fields['nome'] ?? 'Lead';
    const subject = `[Lead] ${source} — ${nome}`;

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
          reply_to: fields['email'] ? [fields['email']] : undefined,
          subject,
          html: buildHtml(fields, source),
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error('Resend error', res.status, body);
        return jsonResponse({ ok: false, error: 'send_failed' }, 500);
      }

      return jsonResponse({ ok: true });
    } catch (err) {
      console.error('Worker error', err);
      return jsonResponse({ ok: false, error: 'internal' }, 500);
    }
  },
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
