

export interface IUser {
    _id: string,
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    isBlocked: boolean,
    lastLogin: string,
}

export interface IUserResponse {
    user: IUser,
    token: string
}

export enum UserENUM {
    AUTH='AUTH',
    LOGOUT='LOGOUT',
    LOGIN_ERROR='LOGIN_ERROR',
    GET_ONE_USER='GET_ONE_USER',
    GET_USERS='GET_USERS',
    CHANGE_STATUS='CHANGE_STATUS',
    USER_HAS_BEEN_BLOCKED='USER_HAS_BEEN_BLOCKED',
    DELETE_USER='DELETE_USER'
}

interface IGetUsersPayload {
    users?: IUser | IUser[],
    numberOfPages: number,
    currentPage: number,
}

interface Auth_User {
    type: UserENUM.AUTH,
    payload: IUserResponse
}

interface Logout_User {
    type: UserENUM.LOGOUT
}

interface Login_Error {
    type: UserENUM.LOGIN_ERROR,
    payload: string
}

interface Get_One_User {
    type: UserENUM.GET_ONE_USER,
    payload: any
}

interface Get_Users {
    type: UserENUM.GET_USERS,
    payload: IGetUsersPayload
}

interface Change_Status {
    type: UserENUM.CHANGE_STATUS,
    payload: IUser 
}

interface User_Has_Been_Blocked {
    type: UserENUM.USER_HAS_BEEN_BLOCKED,
    payload?: string
}

interface Delete_User {
    type: UserENUM.DELETE_USER,
    payload: IUser
}

export type UserActionTypes = Auth_User | Logout_User | Login_Error | Get_One_User | Get_Users |
                              Change_Status | User_Has_Been_Blocked | Delete_User