// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Sitenin canlı adresi (Google ve paylaşım önizlemeleri için tam adresler buradan üretilir)
  site: 'https://palacelikmuhendislik.com',

  // Adresler sonunda "/" olmadan: /hakkimizda, /hizmetler/celik-cati
  trailingSlash: 'never',
  build: { format: 'file' },

  image: {
    // Panelden (Sanity) gelen görseller yayın sırasında indirilip küçültülür ve sitenin içine konur
    domains: ['cdn.sanity.io'],
  },

  integrations: [
    // Google için site haritası: /sitemap-index.xml (404 sayfası hariç)
    sitemap({ filter: (sayfa) => !sayfa.includes('/404') }),
  ],
});
