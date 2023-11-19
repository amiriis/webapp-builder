"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _PendingNotification = _interopRequireDefault(require("./PendingNotification"));
var _WarningNotification = _interopRequireDefault(require("./WarningNotification"));
var _ErrorNotification = _interopRequireDefault(require("./ErrorNotification"));
var _SuccessNotification = _interopRequireDefault(require("./SuccessNotification"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const NotificationsManager = (pushToastList, notificationType, t, status, message) => {
  switch (notificationType) {
    case "pending":
      (0, _PendingNotification.default)(pushToastList, notificationType, t);
      break;
    case "warning":
      (0, _WarningNotification.default)(pushToastList, notificationType, t, status);
      break;
    case "error":
      if (message) {
        (0, _ErrorNotification.default)(pushToastList, notificationType, t, status, message);
      } else {
        (0, _ErrorNotification.default)(pushToastList, notificationType, t, status);
      }
      break;
    case "success":
      (0, _SuccessNotification.default)(pushToastList, notificationType, t, status);
      break;
  }
};
var _default = exports.default = NotificationsManager;