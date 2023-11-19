"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Dangerous = _interopRequireDefault(require("@mui/icons-material/Dangerous"));
var _material = require("@mui/material");
var _reactToastify = require("react-toastify");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ErrorNotification = (pushToastList, notificationType, t, status, message) => {
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
  }, /*#__PURE__*/React.createElement(_Dangerous.default, {
    color: "error",
    sx: {
      mr: 1.6
    }
  }), /*#__PURE__*/React.createElement(_material.Box, {
    sx: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(_material.Typography, {
    color: "error",
    variant: "button"
  }, t("notifications.error"), " (", t("notifications.code"), ": ", status, ")"), /*#__PURE__*/React.createElement(_material.Typography, {
    variant: "caption"
  }, message || t("notifications.error_static_text")))))), {
    containerId: 'validation',
    autoClose: false,
    closeOnClick: false,
    draggable: false
  });
  pushToastList(notificationType, toastId);
};
var _default = exports.default = ErrorNotification;
//# sourceMappingURL=ErrorNotification.js.map