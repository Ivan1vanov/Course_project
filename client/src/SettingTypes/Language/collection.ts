

interface ILanguage {
    VIEV: string,
    DELETE: string,
    ITEMS: string
}

interface ICollectionLG {
    en: ILanguage,
    pl: ILanguage
}

export const CollectionLG: ICollectionLG = {
    en: {
        VIEV: 'VIEV',
        DELETE: 'DELETE',
        ITEMS: 'Items'
    },

    pl: {
        VIEV: 'Otwórz',
        DELETE: 'Usuń ',
        ITEMS: 'Elementów'
    },
}