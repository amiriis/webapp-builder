"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _toast = require("../contexts/toast");
const useToast = () => {
  const {
    dispatch
  } = (0, _react.useContext)(_toast.ToastContext);
  const pushToastList = (toast_type, toast_id) => {
    dispatch({
      type: "PUSH",
      toast_type,
      toast_id
    });
  };
  const dismissToastList = toast_type => {
    dispatch({
      type: "DISMISS",
      toast_type
    });
  };
  return {
    pushToastList,
    dismissToastList
  };
};
var _default = exports.default = useToast;