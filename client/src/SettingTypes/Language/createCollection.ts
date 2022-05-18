
interface ILanguage {
    NAME: string,
    DESCRIPTION: string,
    OPTIONAL_FIELDS: string,
    CREATE: string,
    ADD: string,
    FIELD: string,
    FORMAT: string,
    ADD_FIELD: string,
    FIELDS_INFO: string,
    IMAGE: string
}

interface ICollectionLG {
    en: ILanguage,
    pl: ILanguage
}

export const createCollectionLG: ICollectionLG = {
    en: {
        NAME: 'Name',
        DESCRIPTION: 'Description',
        OPTIONAL_FIELDS: 'Optional fields',
        CREATE: 'Create',
        ADD: "Add",
        FIELD: 'Field',
        FORMAT: 'Format',
        ADD_FIELD: 'Add fields',
        FIELDS_INFO: 'You can add 3 integer fields, 3 string fields, 3 boolean checkboxes, 3 multiline text fields, 3 date fields',
        IMAGE: 'Upload image(optional)'       
    },
    pl: {
        NAME: 'Nazwa',
        DESCRIPTION: 'Opis',
        OPTIONAL_FIELDS: 'Pola opcjonalne',
        CREATE: 'Utwórz',
        ADD: "Dodaj",
        FIELD: 'Pole',
        FORMAT: 'Temat',
        ADD_FIELD: 'Dodaj pola',
        FIELDS_INFO: 'Można dodać 3 pola liczb całkowitych, 3 pola tekstowe, 3 wielowierszowe pola tekstowe, 3 pola wyboru boolean, 3 pola daty',
        IMAGE: 'Zdjęcie(opcjonalnie)'   
    },
}