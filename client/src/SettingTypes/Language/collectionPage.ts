
interface ILanguage {
    DELETE: string,
    CREATE: string,
    AUTHOR: string,
    FORMAT: string,
    EXPORT_CVS: string,

}

interface ICollectionLG {
    en: ILanguage,
    pl: ILanguage
}

export const CollectionPageLG: ICollectionLG = {
    en: {
    DELETE: 'DELETE',
    CREATE: 'Create',
    AUTHOR: 'Author',
    FORMAT: 'Format',
    EXPORT_CVS: 'EXPORT CSV-file'
    },

    pl: {
        DELETE: 'Usuń',
        CREATE: 'Utwórz',
        AUTHOR: 'Właściciel',
        FORMAT: 'Temat',
        EXPORT_CVS: 'EKSPORTUJ plik CSV'
        },
}