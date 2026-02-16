// @ts-check
import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import tailwindcss from '@tailwindcss/vite';
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
    site: 'https://viniciusgoncalves00.github.io',
    base: '/ViniciusGoncalves00/',
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [icon({
      include: {
        mdi: ['github', 'linkedin'],
        uis: ['*']
      },
      svgoOptions: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                inlineStyles: {
                  onlyMatchedOnce: false,
                },
                removeDoctype: false,
              }
            }
          }
        ]
      }
    }), alpinejs()],
    i18n: {
        locales: ["pt-br", "en-us"],
        defaultLocale: "pt-br",
        routing: {
            prefixDefaultLocale: true
        },
        fallback: {
            "en-us": "pt-br",
        },
    }
    
});