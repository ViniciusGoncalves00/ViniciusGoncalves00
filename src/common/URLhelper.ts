import { LocaleOption, Translations } from "../i18n/translations.";

export class URLHelper {
    public static readonly pages = {
        home: "",
        projects: "projects",
        blog: "blog",
        contact: "contact",
        notFound: "404",
        design: "design",
    }
    private static readonly locales = Object.values(LocaleOption);

    private static getSegments(url: URL): string[] {
        return url.pathname.split('/').filter(Boolean);
    }

    public static getLocaleFromURL(url: URL): LocaleOption {
        const segments = this.getSegments(url);
        const locale = segments.find(seg =>
          this.locales.includes(seg as LocaleOption)
        );

        if (!locale) {
            console.warn(`Locale not found in URL. Using default: ${Translations.defaultLocale}`);
            return Translations.defaultLocale;
        }
        return locale as LocaleOption;
    }

    public static getPathAfterLocale(url: URL): string {
        const segments = this.getSegments(url);
        const localeIndex = segments.findIndex(seg =>
            this.locales.includes(seg as LocaleOption)
        );

        if (localeIndex === -1) return "";

        return segments.slice(localeIndex + 1).join('/');
    }

    public static getBasePath(url: URL): string {
        const segments = this.getSegments(url);
        const localeIndex = segments.findIndex(seg =>
          this.locales.includes(seg as LocaleOption)
        );

        if (localeIndex === -1) return "";

        return segments.slice(0, localeIndex).join('/');
    }

    public static buildFullPathFromLocale(url: URL, locale: LocaleOption): string {
        return `${this.getBasePath(url)}/${locale}/${this.getPathAfterLocale(url)}`
    }

    public static buildFullPathFromPath(url: URL, path: string): string {
        return `${this.getBasePath(url)}/${this.getLocaleFromURL(url)}/${path}`
    }
}
