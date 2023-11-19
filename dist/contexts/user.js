"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserProvider = exports.UserContext = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.symbol.description.js");
var _react = _interopRequireWildcard(require("react"));
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const initialUser = {
  isAuth: false,
  userChangedLanguage: false,
  token: null,
  user: {}
};
const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_USER":
      return _objectSpread(_objectSpread({}, state), {}, {
        user: {}
      });
    case "CHANGE_USER":
      return _objectSpread(_objectSpread({}, state), {}, {
        user: action.user
      });
    case "CHANGE_USER_LANGUAGE":
      return _objectSpread(_objectSpread({}, state), {}, {
        user: _objectSpread(_objectSpread({}, state.user), {}, {
          user_language: action.language
        })
      });
    case "CHANGE_AUTH_STATE":
      return _objectSpread(_objectSpread({}, state), {}, {
        isAuth: action.isAuth
      });
    case "CHANGE_LANGUAGE_STATE":
      return _objectSpread(_objectSpread({}, state), {}, {
        userChangedLanguage: action.userChangedLanguage
      });
    case "CLEAR_TOKEN":
      localStorage.removeItem("_token");
      return _objectSpread(_objectSpread({}, state), {}, {
        token: null
      });
    case "SET_TOKEN":
      localStorage.setItem("_token", action.token);
      return _objectSpread(_objectSpread({}, state), {}, {
        token: action.token
      });
    default:
      return state;
  }
};
const UserContext = exports.UserContext = /*#__PURE__*/(0, _react.createContext)();
const UserProvider = _ref => {
  let {
    children,
    url_get_user
  } = _ref;
  const [state, dispatch] = (0, _react.useReducer)(reducer, initialUser);
  const clearUser = (0, _react.useCallback)(() => {
    dispatch({
      type: "CLEAR_USER"
    });
  }, []);
  const changeUser = (0, _react.useCallback)(user => {
    dispatch({
      type: "CHANGE_USER",
      user
    });
  }, []);
  const changeUserLanguage = (0, _react.useCallback)( /* use in multi language app */);
  const changeAuthState = (0, _react.useCallback)(isAuth => {
    dispatch({
      type: "CHANGE_AUTH_STATE",
      isAuth
    });
  }, []);
  const changeLanguageState = (0, _react.useCallback)(userChangedLanguage => {
    dispatch({
      type: "CHANGE_LANGUAGE_STATE",
      userChangedLanguage
    });
  }, []);
  const clearToken = (0, _react.useCallback)(() => {
    dispatch({
      type: "CLEAR_TOKEN"
    });
  }, []);
  const setToken = (0, _react.useCallback)(token => {
    dispatch({
      type: "SET_TOKEN",
      token
    });
  }, []);
  const getUser = (0, _react.useCallback)(function () {
    let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : () => {};
    _axios.default.get(url_get_user, {
      headers: {
        authorization: "Bearer ".concat(state.token)
      }
    }).then(_ref2 => {
      let {
        data
      } = _ref2;
      if (typeof callback === "function") callback(data.data);
    }).catch(error => {
      if (error.response.status === 401) clearToken();
    });
  }, [state.token]);
  (0, _react.useEffect)(() => {
    const localToken = localStorage.getItem("_token");
    if (localToken) dispatch({
      type: "SET_TOKEN",
      token: localToken
    });
  }, []);
  (0, _react.useEffect)(() => {
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
  return /*#__PURE__*/_react.default.createElement(UserContext.Provider, {
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
exports.UserProvider = UserProvider;