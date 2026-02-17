export type Translation = {
    header: {
        home: string;
        projects: string;
        blog: string;
        contact: string;
        design: string;
        notFound: string;
    },
    footer: {
        
    },
    blog: {
        disclaimer: string;
        essay: string;
        filter: {
            search: string,
            tags: string,
        },
        list: {
            title: string,
            tags: string,
            createdAt: string,
            lastUpdate: string,
        }
    },
    notFound: {
        notFound: string,
    }
}

const brazilian: Translation = {
    header: {
        home: 'Início',
        projects: 'Projetos',
        blog: 'Blog',
        contact: 'Contato',
        design: 'Design',
        notFound: '404',
    },
    footer: {},
    blog: {
        disclaimer: "Os textos a seguir são apenas uma exposição pública de meus estudos, reflexões e ideias. Considere-os ensaios.",
        essay: "Ensaio é um gênero literário (ou não) caracterizado pela exposição reflexiva, opinativa e subjetiva do autor sobre determinado tema.",
        filter: {
            search: "Buscar por título...",
            tags: "Todas as tags",
        },
        list: {
            title: "Título",
            tags: "Etiquetas",
            createdAt: "Criado em",
            lastUpdate: "Última atualização",
        }
    },
    notFound: {
        notFound: "Página não encontrada!"
    }
}

const englishAmerican: Translation = {
    header: {
        home: 'Home',
        projects: 'Projects',
        blog: 'Blog',
        contact: 'Contact',
        design: 'Design',
        notFound: '404',
    },
    footer: {},
    blog: {
        disclaimer: "The following texts are merely a public exposition of my studies, reflections, and ideas. Consider them essays.",
        essay: "An essay is a literary (or non-literary) genre characterized by the author's reflective, opinionated, and subjective exposition on a given topic.",
        filter: {
            search: "Search for a title...",
            tags: "All tags",
        },
        list: {
            title: "Title",
            tags: "Tags",
            createdAt: "Created at",
            lastUpdate: "Last update",
        }
    },
    notFound: {
        notFound: "Page not found!"
    }
}

export type LanguageInfo = {
    localAbbreviation: string;
    englishAbbreviation: string;
    localName: string;
    englishName: string;
}

export enum LocaleOption {
    PT_BR = "pt-br",
    EN_US = "en-us",
}

export class Translations {
    public static readonly defaultLocale: LocaleOption = LocaleOption.PT_BR;
    public static readonly defaultTranslation: Translation = brazilian;

    private static readonly translations = new Map<LocaleOption, Translation>([
        [LocaleOption.PT_BR, brazilian],
        [LocaleOption.EN_US, englishAmerican],
    ] as const);

    private static readonly languagesInfo = new Map<LocaleOption, LanguageInfo>([
        [LocaleOption.PT_BR, { localAbbreviation: "pt-br", englishAbbreviation: "pt-br", localName:'Português', englishName:"Portuguese" }],
        [LocaleOption.EN_US, { localAbbreviation: "en-us", englishAbbreviation: "en-us", localName:'English', englishName:"English" }],
    ] as const);

    public static getLocaleInfo(locale: LocaleOption): LanguageInfo {
        return this.languagesInfo.get(locale)!;
    }

    public static getTranslation(locale: LocaleOption): Translation {
        return this.translations.get(locale)!;
    }
}