"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastProvider = exports.ToastContext = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.symbol.description.js");
var _react = require("react");
var _reactToastify = require("react-toastify");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const ToastContext = exports.ToastContext = /*#__PURE__*/(0, _react.createContext)();
const reducer = (state, action) => {
  switch (action.type) {
    case "PUSH":
      return _objectSpread(_objectSpread({}, state), {}, {
        [action.toast_type]: [...state[action.toast_type], action.toast_id]
      });
    case "DISMISS":
      action.toast_type.map(item => {
        state[item].map(id => {
          _reactToastify.toast.dismiss(id);
        });
        state[item] = [];
      });
      return state;
  }
};
const ToastProvider = _ref => {
  let {
    children
  } = _ref;
  const [state, dispatch] = (0, _react.useReducer)(reducer, {
    pending: [],
    error: [],
    warning: [],
    success: []
  });
  return /*#__PURE__*/React.createElement(ToastContext.Provider, {
    value: {
      state,
      dispatch
    }
  }, children);
};
exports.ToastProvider = ToastProvider;