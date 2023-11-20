import axios from "axios";
import React, {createContext, useCallback, useEffect, useReducer} from "react";
import {IUserAction, IUserActionKind, IUserContext, IUserState} from "../../@types/user";

const initialUser: IUserState = {
    isAuth: false,
    userChangedLanguage: false,
    token: null,
    user: {},
};

const reducer = (state: IUserState, action: IUserAction) => {
    switch (action.type) {
        case IUserActionKind.CLEAR_USER:
            return {...state, user: {}};
        case IUserActionKind.CHANGE_USER:
            return {...state, user: action.user};
        case IUserActionKind.CHANGE_USER_LANGUAGE:
            return {
                ...state,
                user: {...state.user, user_language: action.language},
            };
        case IUserActionKind.CHANGE_AUTH_STATE:
            return {...state, isAuth: action.isAuth};
        case IUserActionKind.CHANGE_LANGUAGE_STATE:
            return {...state, userChangedLanguage: action.userChangedLanguage};
        case IUserActionKind.CLEAR_TOKEN:
            localStorage.removeItem("_token");
            return {...state, token: null};
        case IUserActionKind.SET_TOKEN:
            if (typeof action.token === "string") {
                localStorage.setItem("_token", action.token);
            }
            return {...state, token: action.token};
        default:
            return state;
    }
};

export const UserContext = createContext<IUserContext | undefined>(undefined)

export const UserProvider: React.FC<React.PropsWithChildren<{ urlGetUser: string }>> = ({children, urlGetUser}) => {
    const [state, dispatch] = useReducer(reducer, initialUser);

    const clearUser = useCallback(() =>
            dispatch({type: IUserActionKind.CLEAR_USER})
        , []);

    const changeUser = useCallback((user: object) =>
            dispatch({type: IUserActionKind.CHANGE_USER, user})
        , []);

    const changeUserLanguage = useCallback(() => {
        /* use in multi-language app */
    }, []);

    const changeAuthState = useCallback((isAuth: boolean) => {
        dispatch({type: IUserActionKind.CHANGE_AUTH_STATE, isAuth});
    }, []);

    const changeLanguageState = useCallback((userChangedLanguage: boolean) => {
        dispatch({type: IUserActionKind.CHANGE_LANGUAGE_STATE, userChangedLanguage});
    }, []);

    const clearToken = useCallback(() => {
        dispatch({type: IUserActionKind.CLEAR_TOKEN});
    }, []);

    const setToken = useCallback((token: string | null) => {
        dispatch({type: IUserActionKind.SET_TOKEN, token});
    }, []);

    const getUser = useCallback(
        (callback: (data: object) => void) => {
            axios
                .get(urlGetUser, {
                    headers: {authorization: `Bearer ${state.token}`},
                })
                .then(({data}) => {
                    if (typeof callback === "function") callback(data.data);
                })
                .catch(error => {
                    if (error.response.status === 401) clearToken()
                })
        },
        [state.token]
    );

    useEffect(() => {
        const localToken = localStorage.getItem("_token");
        if (localToken) dispatch({type: IUserActionKind.SET_TOKEN, token: localToken});
    }, []);

    useEffect(() => {
        if (!state.token) {
            clearUser();
            changeAuthState(false);
            changeLanguageState(false);
            return;
        }
        getUser((data: object) => {
            changeUser(data);
            changeAuthState(true);
            changeLanguageState(true);
        });
    }, [state.token]);

    return (
        <UserContext.Provider
            value={{
                isAuth: state.isAuth,
                userChangedLanguage: state.userChangedLanguage,
                token: state.token,
                user: state.user,
                getUser,
                clearUser,
                changeUser,
                changeUserLanguage,
                changeAuthState,
                changeLanguageState,
                clearToken,
                setToken,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};