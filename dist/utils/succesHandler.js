"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.successRequest = void 0;
var _NotificationManager = _interopRequireDefault(require("../components/notifications/NotificationManager"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const successRequest = (pushToastList, dismissToastList, response, t, options) => {
  if (options.notification && options.success.notification.show) {
    dismissToastList(["pending", "warning", "error", "success"]);
    (0, _NotificationManager.default)(pushToastList, "success", t, response.status);
  }
};
exports.successRequest = successRequest;