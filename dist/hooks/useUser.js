"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _user = require("../contexts/user");
const useUser = () => {
  const {
    isAuth,
    userChangedLanguage,
    token,
    user,
    getUser,
    clearUser,
    changeUser,
    changeAuthState,
    changeLanguageState,
    clearToken,
    setToken
  } = (0, _react.useContext)(_user.UserContext);
  return {
    isAuth,
    userChangedLanguage,
    token,
    user,
    getUser,
    clearUser,
    changeUser,
    changeAuthState,
    changeLanguageState,
    clearToken,
    setToken
  };
};
var _default = exports.default = useUser;
//# sourceMappingURL=useUser.js.map