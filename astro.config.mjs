// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.skeilo.tech',
	integrations: [sitemap()],
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
			name: 'Space Grotesk',
			cssVariable: '--font-space-grotesk',
			weights: [400, 500, 600, 700],
			styles: ['normal'],
			fallbacks: ['sans-serif'],
		},
	],
});
