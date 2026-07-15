// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.skeilo.tech',
	adapter: vercel(),
	integrations: [sitemap()],
	env: {
		schema: {
			RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
			RESEND_FROM_EMAIL: envField.string({ context: 'server', access: 'secret' }),
			RESEND_TO_EMAIL: envField.string({ context: 'server', access: 'secret' }),
			RECAPTCHA_SITE_KEY: envField.string({ context: 'client', access: 'public' }),
			RECAPTCHA_SECRET_KEY: envField.string({ context: 'server', access: 'secret' }),
		},
	},
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Mono',
			cssVariable: '--font-ibm-plex-mono',
			weights: [400, 500],
			styles: ['normal'],
			fallbacks: ['monospace'],
		},
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Sans',
			cssVariable: '--font-ibm-plex-sans',
			weights: [400, 500, 600],
			styles: ['normal'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'Sora',
			cssVariable: '--font-sora',
			weights: [500, 600, 700],
			styles: ['normal'],
			fallbacks: ['sans-serif'],
		},
	],
});
