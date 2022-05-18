interface ILanguage {
    NAME: string,
    TAGS: string,
    CREATE: string
}

interface IItemLG {
    en: ILanguage,
    pl: ILanguage
}

export const createItemLG: IItemLG = {
    en: {
        NAME: 'Name',
        TAGS: 'Tags',
        CREATE: 'Create'
    },

     pl: {
        NAME: 'Nazwa',
        TAGS: 'Tagi',
        CREATE: 'Utwórz'
    }
}