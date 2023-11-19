"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Dangerous = _interopRequireDefault(require("@mui/icons-material/Dangerous"));
var _material = require("@mui/material");
var _reactToastify = require("react-toastify");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UploadFileNotification = t => {
  (0, _reactToastify.toast)(_ref => {
    let {
      closeToast
    } = _ref;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_material.Box, {
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
    }, t("UploadSystem.uploadfile_error"))))));
  }, {
    containerId: 'validation',
    toastId: 'upload',
    autoClose: 3000,
    hideProgressBar: true,
    pauseOnHover: true,
    closeOnClick: false,
    draggable: true
  });
};
var _default = exports.default = UploadFileNotification;