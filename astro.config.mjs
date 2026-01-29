// @ts-check
import { defineConfig } from 'astro/config';
import icon from "astro-icon";

import tailwindcss from '@tailwindcss/vite';

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [icon(), alpinejs()],
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