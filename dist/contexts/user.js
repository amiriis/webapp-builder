import React, { createContext, useCallback, useEffect, useReducer } from 'react';
import axios from "axios";
const initialUser = {
  isAuth: false,
  userChangedLanguage: false,
  token: null,
  user: {}
};
const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_USER":
      return {
        ...state,
        user: {}
      };
    case "CHANGE_USER":
      return {
        ...state,
        user: action.user
      };
    case "CHANGE_USER_LANGUAGE":
      return {
        ...state,
        user: {
          ...state.user,
          user_language: action.language
        }
      };
    case "CHANGE_AUTH_STATE":
      return {
        ...state,
        isAuth: action.isAuth
      };
    case "CHANGE_LANGUAGE_STATE":
      return {
        ...state,
        userChangedLanguage: action.userChangedLanguage
      };
    case "CLEAR_TOKEN":
      localStorage.removeItem("_token");
      return {
        ...state,
        token: null
      };
    case "SET_TOKEN":
      localStorage.setItem("_token", action.token);
      return {
        ...state,
        token: action.token
      };
    default:
      return state;
  }
};
export const UserContext = /*#__PURE__*/createContext();
export const UserProvider = ({
  children,
  url_get_user
}) => {
  const [state, dispatch] = useReducer(reducer, initialUser);
  const clearUser = useCallback(() => {
    dispatch({
      type: "CLEAR_USER"
    });
  }, []);
  const changeUser = useCallback(user => {
    dispatch({
      type: "CHANGE_USER",
      user
    });
  }, []);
  const changeUserLanguage = useCallback( /* use in multi language app */);
  const changeAuthState = useCallback(isAuth => {
    dispatch({
      type: "CHANGE_AUTH_STATE",
      isAuth
    });
  }, []);
  const changeLanguageState = useCallback(userChangedLanguage => {
    dispatch({
      type: "CHANGE_LANGUAGE_STATE",
      userChangedLanguage
    });
  }, []);
  const clearToken = useCallback(() => {
    dispatch({
      type: "CLEAR_TOKEN"
    });
  }, []);
  const setToken = useCallback(token => {
    dispatch({
      type: "SET_TOKEN",
      token
    });
  }, []);
  const getUser = useCallback((callback = () => {}) => {
    axios.get(url_get_user, {
      headers: {
        authorization: `Bearer ${state.token}`
      }
    }).then(({
      data
    }) => {
      if (typeof callback === "function") callback(data);
    }).catch(error => {
      if (error.response.status === 401) clearToken();
    });
  }, [state.token]);
  useEffect(() => {
    const localToken = localStorage.getItem("_token");
    if (localToken) dispatch({
      type: "SET_TOKEN",
      token: localToken
    });
  }, []);
  useEffect(() => {
    if (!state.token) {
      clearUser();
      changeAuthState(false);
      changeLanguageState(false);
      return;
    }
    getUser(data => {
      changeUser(data);
      changeAuthState(true);
      changeLanguageState(true);
    });
  }, [state.token]);
  return /*#__PURE__*/React.createElement(UserContext.Provider, {
    value: {
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
      setToken
    }
  }, children);
};