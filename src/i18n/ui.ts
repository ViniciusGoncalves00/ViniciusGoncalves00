export type LanguageInfo = {
    abbreviation: string;
    nativeName: string;
    internationalName: string;
}

export const languages: LanguageInfo[] = [
    {abbreviation: "pt-br", nativeName:'Português', internationalName:"Portuguese"},
    {abbreviation: "en-us", nativeName:'English', internationalName:"English"},
];

export const defaultLanguage = 'pt-br';

export const ui = {
    "pt-br": {
        'navigation.home': 'Início',
        'navigation.blog': 'Blog',
        'navigation.contact': 'Contato',
        'navigation.404': '404',
    },
    "en-us": {
        'navigation.home': 'Home',
        'navigation.blog': 'Blog',
        'navigation.contact': 'Contact',
        'navigation.404': '404',
    },
} as const;