"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _contexts = require("../contexts");
var _useUser = _interopRequireDefault(require("./useUser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const useLanguage = () => {
  const {
    isAuth,
    changeUserLanguage
  } = (0, _useUser.default)();
  const {
    languageApp,
    setLanguageApp,
    languageIsReady,
    setLanguageIsReady,
    languageList
  } = (0, _react.useContext)(_contexts.LanguageContext);
  const changeLanguage = lang => {
    if (lang === languageApp) return;
    setLanguageIsReady(false);
    setLanguageApp(lang);
    if (isAuth) {
      changeUserLanguage(lang);
    }
  };
  return {
    languageApp,
    changeLanguage,
    languageIsReady,
    languageList
  };
};
var _default = exports.default = useLanguage;