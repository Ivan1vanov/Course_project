




export enum SettingsENUM {
    CHANGE_LANGUAGE='CHANGE_LANGUAGE',
    CHANCHE_COLOR='CHANCHE_COLOR'
}


interface Change_Language {
    type: SettingsENUM.CHANGE_LANGUAGE,
    payload?: string
}

interface Change_Color {
    type: SettingsENUM.CHANCHE_COLOR,
    payload?: string
}

export type SettingsActionType = Change_Language | Change_Color