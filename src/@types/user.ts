interface IUser {
    id?: number
    full_name?: string,
    username?: string,
    gender?: string | null,
    email?: string,
    phone_number?: string,
    avatar?: string | null,
    national_id?: string | null,
    position?: string | null,
    province_id?: number,
    province_name?: string | null,
    role?: string | null,
    permissions?: string[],
    user_language?: string,
    telephone_id?: string
}

export interface IUserState {
    isAuth: boolean,
    userChangedLanguage: boolean,
    token: string | null,
    language?: string,
    user: IUser
}

export enum IUserActionKind {
    CLEAR_USER = 'CLEAR_USER',
    CHANGE_USER = 'CHANGE_USER',
    CHANGE_USER_LANGUAGE = 'CHANGE_USER_LANGUAGE',
    CHANGE_AUTH_STATE = 'CHANGE_AUTH_STATE',
    CHANGE_LANGUAGE_STATE = 'CHANGE_LANGUAGE_STATE',
    CLEAR_TOKEN = 'CLEAR_TOKEN',
    SET_TOKEN = 'SET_TOKEN',
}

export interface IUserContext extends IUserState {
    getUser: (callback: (data: object) => void) => void,
    clearUser: () => void,
    changeUser: (user: object) => void,
    changeUserLanguage: (lang: string) => void,
    changeAuthState: (isAuth: boolean) => void,
    changeLanguageState?: (userChangedLanguage: boolean) => void,
    clearToken: () => void,
    setToken: (token: string | null) => void,
}


export interface IUserAction {
    type: IUserActionKind,

    [key: string]: any
}