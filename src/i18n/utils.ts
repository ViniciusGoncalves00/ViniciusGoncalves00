import { ui, defaultLanguage } from './ui';
import { type Translation, translations } from './translations.';

export function getLanguageFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLanguage;
}

export function getPartFromUrl(url: URL, index: number) {
    const parts = url.pathname.split('/');
    return parts[index] ?? "";
}

export function getPage(url: URL) {
    const parts = url.pathname.split('/');
    parts.shift();
    parts.shift();
    return parts.join("/");
}

export function useTranslations(translation: keyof Translation) {
    return function t(key: keyof typeof ui[typeof defaultLanguage]) {
        return ui[lang][key] || ui[defaultLanguage][key];
    }
}