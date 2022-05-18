import { SettingsENUM } from '../types/settingsType';


const initState = {
    lg: 'en',
    color: 'white'
}

export const settingsReducer = (state = initState, action: any) => {
    switch (action.type) {
        case SettingsENUM.CHANGE_LANGUAGE:
            return {
                ...state,
                lg: action.payload
            }

        case SettingsENUM.CHANCHE_COLOR:
            return {
                ...state,
                color: action.payload
            }
        default:
            return state
    }
}