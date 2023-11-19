"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactToastify = require("react-toastify");
const PendingNotification = (pushToastList, notificationType, t) => {
  const toastId = (0, _reactToastify.toast)(t("notifications.pending"), {
    containerId: 'validation',
    autoClose: false,
    closeButton: false,
    closeOnClick: false,
    draggable: false
  });
  pushToastList(notificationType, toastId);
};
var _default = exports.default = PendingNotification;
//# sourceMappingURL=PendingNotification.js.map