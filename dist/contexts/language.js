"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LanguageProvider = exports.LanguageContext = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _router = require("next/router");
var _react = require("react");
var _useUser = _interopRequireDefault(require("../hooks/useUser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const LanguageContext = exports.LanguageContext = /*#__PURE__*/(0, _react.createContext)();
const LanguageProvider = _ref => {
  let {
    children,
    defaultLocalization
  } = _ref;
  const router = (0, _router.useRouter)();
  const languageList = [{
    key: "fa",
    dir: "rtl",
    name: "فارسی",
    fontFamily: "IRANSansFaNum, sans-serif",
    tableLocalization: defaultLocalization['fa'].datatable,
    chartLocalization: defaultLocalization['fa'].chart
  }];
  const {
    user,
    userChangedLanguage,
    changeLanguageState
  } = (0, _useUser.default)();
  const [languageIsReady, setLanguageIsReady] = (0, _react.useState)(false);
  const [languageApp, setLanguageApp] = (0, _react.useState)(process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE);
  const [directionApp, setDirectionApp] = (0, _react.useState)(process.env.NEXT_PUBLIC_DEFAULT_DIRECTION);
  (0, _react.useEffect)(() => {
    const lang = localStorage.getItem("_language");
    if (lang) {
      setLanguageApp(lang);
    }
  }, []);
  (0, _react.useEffect)(() => {
    if (!languageApp) return;
    const lang = localStorage.getItem("_language");
    if (!lang) {
      localStorage.setItem("_language", languageApp);
    } else {
      if (languageApp !== lang) {
        localStorage.setItem("_language", languageApp);
      }
    }
  }, [languageApp]);
  (0, _react.useEffect)(() => {
    if (!router.isReady) return;
    if (user.user_language) {
      if (user.user_language !== languageApp) {
        setLanguageApp(user.user_language);
        return;
      }
    }
    if (languageApp !== router.locale) {
      router.replace({
        pathname: router.pathname,
        query: router.query
      }, router.asPath, {
        locale: languageApp
      });
      return;
    }
    for (const lang of languageList) {
      if (languageApp !== lang.key) continue;
      setDirectionApp(lang.dir);
      document.dir = lang.dir;
    }
    const timer = setTimeout(() => {
      changeLanguageState(false);
      setLanguageIsReady(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [router.locale, router.isReady, userChangedLanguage, languageApp]);
  return /*#__PURE__*/React.createElement(LanguageContext.Provider, {
    value: {
      languageApp,
      setLanguageApp,
      directionApp,
      languageIsReady,
      setLanguageIsReady,
      languageList
    }
  }, children);
};
exports.LanguageProvider = LanguageProvider;