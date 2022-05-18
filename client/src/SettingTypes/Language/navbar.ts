export const d = ''


// interface ILanguage {
//     en: any,
//     pl: any
// }

interface ILanguage {
    CREATE_COLLECTION: string,
    MY_PAGE: string,
    ADMIN_PAGE: string,
    HOME: string,
    HELLO: string,
    SEARCH: string,
    LOGOUT: string,
    LANGUAGE: string,
    COLOR: string,
    WHITE: string,
    BLACK: string,
}

interface INavbar {
    en: ILanguage,
    pl: ILanguage
}

// export const Language: ILanguage = {
//     en: {
//         CREATE_COLLECTION: 'Create Collection',
//         MY_PAGE: 'MY Page',
//         ADMIN_PAGE: 'Admin Page',
//         CREATE: 'Create',
//         DELETE: 'Delete',
//         UPDATE: 'Update',
//         HOME: 'HOME'
//     },

//     pl: {
//         HOME: 'Strona Glówna',
//         CREATE_COLLECTION: 'Utwórz kolekcję',
//         MY_PAGE: 'Moja strona',
//         ADMIN_PAGE: 'Admin Page',
//         VIEV: 'Otwórz',

//         CREATE: 'Create',
//         DELETE: 'Delete',
//         UPDATE: 'Update',
//     }
// }

export const NavbarLG: INavbar = {
    en: {
        CREATE_COLLECTION: 'Create Collection',
        MY_PAGE: 'MY Page',
        ADMIN_PAGE: 'Admin Page',
        HOME: 'Home',
        HELLO: 'Hello',
        SEARCH: 'Search',
        LOGOUT: 'Logout',
        LANGUAGE: 'Language',
        COLOR: 'Color',
        WHITE: 'White',
        BLACK: 'Black'
    },

    pl: {
        HOME: 'Strona Glówna',
        CREATE_COLLECTION: 'Utwórz kolekcję',
        MY_PAGE: 'Moja strona',
        ADMIN_PAGE: 'Strona zarządzania',
        HELLO: 'Cześć',
        SEARCH: 'Szukaj',
        LOGOUT: 'Wyjść',
        LANGUAGE: 'Język',
        COLOR: 'Color',
        WHITE: 'Biały',
        BLACK: 'Czarny'
    }
}