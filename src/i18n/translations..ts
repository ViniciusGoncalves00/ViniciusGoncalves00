export type Translation = {
    header: {
        home: string;
        blog: string;
        contact: string;
        notFound: string;
    },
    footer: {
        
    },
    blog: {
        disclaimer: string;
    },
}

export enum LanguageOptions {
    PTBR = "pt-br",
    ENUS = "en-us",
}

export class Translations {
    public static get(language: LanguageOptions): Translations {
        switch (language) {
            case LanguageOptions.ENUS: return englishAmerican;
            default:  return brazilian;
        }
    }
}

const brazilian: Translation = {
    header: {
        home: 'Início',
        blog: 'Blog',
        contact: 'Contato',
        notFound: '404',
    },
    footer: {
    },
    blog: {
        disclaimer: "Os textos a seguir são apenas uma exposição pública de meus estudos, reflexões e ideias.<br> Considere-os ensaios.<br> <i>Ensaio é um gênero literário (ou não) caracterizado pela exposição reflexiva, opinativa e subjetiva do autor sobre determinado tema</i>",
    }
}

const englishAmerican: Translation = {
    header: {
        home: 'Home',
        blog: 'Blog',
        contact: 'Contact',
        notFound: '404',
    },
    footer: {
    },
    blog: {
        disclaimer: "Os textos a seguir são apenas uma exposição pública de meus estudos, reflexões e ideias.<br> Considere-os ensaios.<br> <i>Ensaio é um gênero literário (ou não) caracterizado pela exposição reflexiva, opinativa e subjetiva do autor sobre determinado tema</i>",
    }
}