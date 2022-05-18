

interface ILanguage {
    UPDATE: string,
    DELETE: string,
    COMMENTS: string,
    CREATE_COMMENT: string,
    CREATE: string,
    SORT_BY: string,
    date_from_early: string,
    date_from_the_latest: string,
    likes_from_the_most_popular: string,
    likes_from_the_smallest: string

}

interface IItemLG {
    en: ILanguage,
    pl: ILanguage
}

export const itemLG: IItemLG = {
    en: {
        UPDATE: 'Update',
        DELETE: 'Delete',
        COMMENTS: 'Comments',
        CREATE_COMMENT: 'Create comment...',
        CREATE: 'Create',
        SORT_BY: 'Sort by',
        date_from_early: 'Date from early',
        date_from_the_latest: 'Date from the latest',
        likes_from_the_most_popular: 'Likes from the best',
        likes_from_the_smallest: 'Likes from the smallest'

    },
    pl: {
        UPDATE: 'Modyfikować',
        DELETE: 'Usuń',
        COMMENTS: 'Komentarze',
        CREATE_COMMENT: ' Utwórz komentarz...',
        CREATE: 'Utwórz',
        SORT_BY: 'Sortuj według',
        date_from_early: 'Data od najbardziej wczesnego',
        date_from_the_latest: 'Data od najpóźniejszej',
        likes_from_the_most_popular: 'Like od najlepszych',
        likes_from_the_smallest: 'Like od najmniejszych'   
    },

}