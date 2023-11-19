"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Beenhere = _interopRequireDefault(require("@mui/icons-material/Beenhere"));
var _material = require("@mui/material");
var _reactToastify = require("react-toastify");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SuccessNotification = (pushToastList, notificationType, t, status) => {
  const toastId = (0, _reactToastify.toast)(() => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_material.Box, {
    sx: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      justifyContent: "start"
    }
  }, /*#__PURE__*/React.createElement(_material.Box, {
    sx: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(_Beenhere.default, {
    color: "success",
    sx: {
      mr: 1.6
    }
  }), /*#__PURE__*/React.createElement(_material.Box, {
    sx: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(_material.Typography, {
    color: "success.main",
    variant: "button"
  }, t("notifications.success"), " (", t("notifications.code"), ":", " ", status, ")"), /*#__PURE__*/React.createElement(_material.Typography, {
    variant: "caption"
  }, t("notifications.success_static_text")))))), {
    containerId: 'validation',
    autoClose: 3000,
    hideProgressBar: true,
    pauseOnHover: true,
    closeOnClick: false,
    draggable: true
  });
  pushToastList(notificationType, toastId);
};
var _default = exports.default = SuccessNotification;