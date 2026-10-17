// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://chicosacolas.com.br',
  integrations: [sitemap()],
  vite: {
    build: {
      rollupOptions: {
        output: {
          // Astro nomeia o CSS da página como "index@_@astro", e o Cloudflare
          // responde 307 para a versão com %40 — um round-trip extra no CSS crítico.
          assetFileNames: (asset) =>
            `_astro/${(asset.names?.[0] ?? 'asset').replace(/\.[^.]+$/, '').replace(/[^\w-]/g, '_')}.[hash][extname]`,
        },
      },
    },
  },
});
