"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.symbol.description.js");
var _axios = _interopRequireDefault(require("axios"));
var _errorHandler = require("../utils/errorHandler");
var _succesHandler = require("../utils/succesHandler");
var _nextIntl = require("next-intl");
var _useUser = _interopRequireDefault(require("./useUser"));
var _useNetwork = _interopRequireDefault(require("./useNetwork"));
var _NotificationManager = _interopRequireDefault(require("../components/notifications/NotificationManager"));
var _useToast = _interopRequireDefault(require("./useToast"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const defaultOptions = {
  auth: false,
  data: {},
  requestOptions: {
    headers: {}
  },
  notification: true,
  pending: true,
  success: {
    notification: {
      show: true
    }
  },
  failed: {
    notification: {
      show: true
    }
  }
};
const useRequest = initOptions => {
  const network = (0, _useNetwork.default)();
  const t = (0, _nextIntl.useTranslations)();
  const {
    token,
    clearToken
  } = (0, _useUser.default)();
  const {
    pushToastList,
    dismissToastList
  } = (0, _useToast.default)();
  let _options = _objectSpread(_objectSpread({}, defaultOptions), initOptions);
  function requestServer() {
    let url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';
    let options = arguments.length > 2 ? arguments[2] : undefined;
    _options = _objectSpread(_objectSpread({}, _options), options);
    if (_options.auth) _options = _objectSpread(_objectSpread({}, _options), {}, {
      requestOptions: _objectSpread(_objectSpread({}, _options.requestOptions), {}, {
        headers: _objectSpread(_objectSpread({}, _options.requestOptions.headers), {}, {
          authorization: "Bearer ".concat(token)
        })
      })
    });
    return new Promise((resolve, reject) => {
      if (!network.online) {
        reject();
        return;
      }
      if (_options.notification && _options.failed.notification.show && _options.pending) {
        dismissToastList(["pending", "warning", "error", "success"]);
        (0, _NotificationManager.default)(pushToastList, "pending", t);
      }
      (0, _axios.default)(_objectSpread({
        url: url,
        method: method,
        data: _options.data
      }, _options.requestOptions)).then(response => {
        (0, _succesHandler.successRequest)(pushToastList, dismissToastList, response, t, _options);
        resolve(response);
      }).catch(error => {
        if (error.response) {
          (0, _errorHandler.errorResponse)(pushToastList, dismissToastList, error.response, clearToken, t, _options.notification && _options.failed.notification.show);
        } else if (error.request) {
          (0, _errorHandler.errorRequest)(dismissToastList, t, _options.notification && _options.failed.notification.show);
        } else {
          (0, _errorHandler.errorSetting)(dismissToastList, t, _options.notification && _options.failed.notification.show);
        }
        reject(error);
      });
    });
  }
  return requestServer;
};
var _default = exports.default = useRequest;
//# sourceMappingURL=useRequest.js.map