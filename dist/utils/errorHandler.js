"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorSetting = exports.errorResponse = exports.errorRequest = void 0;
var _NotificationManager = _interopRequireDefault(require("../components/notifications/NotificationManager"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const errorSetting = (dismissToastList, t, notification) => {
  if (notification) {
    dismissToastList(["pending", "warning", "error", "success"]);
  }
};
exports.errorSetting = errorSetting;
const errorRequest = (dismissToastList, t, notification) => {
  if (notification) {
    dismissToastList(["pending", "warning", "error", "success"]);
  }
};
exports.errorRequest = errorRequest;
const errorResponse = (pushToastList, dismissToastList, response, clearToken, t, notification) => {
  if (notification) {
    dismissToastList(["pending", "warning", "error", "success"]);
  }
  if (isServerError(response.status)) {
    errorServer(pushToastList, response, t, notification);
  } else if (isClientError(response.status)) {
    errorClient(pushToastList, response, clearToken, t, notification);
  }
};
exports.errorResponse = errorResponse;
const errorServer = (pushToastList, response, t, notification) => {
  if (notification) (0, _NotificationManager.default)(pushToastList, "warning", t, response.status);
};
const errorClient = (pushToastList, response, clearToken, t, notification) => {
  switch (response.status) {
    case 401:
      clearToken();
      if (notification) (0, _NotificationManager.default)(pushToastList, "error", t, response.status);
      break;
    case 422:
      if ('type' in response.data) {
        errorLogic(pushToastList, response, t, notification);
        break;
      }
      errorValidation(pushToastList, response, t, notification);
      break;
    case 429:
      if (notification) (0, _NotificationManager.default)(pushToastList, "error", t, response.status);
      break;
    default:
      if (notification) (0, _NotificationManager.default)(pushToastList, "error", t, response.status);
      break;
  }
};
const isServerError = status => status >= 500 && status <= 599;
const isClientError = status => status >= 400 && status <= 499;
const errorLogic = (pushToastList, response, t, notification) => {
  if (notification) (0, _NotificationManager.default)(pushToastList, "error", t, response.status, response.data.message);
};
const errorValidation = (pushToastList, response, t, notification) => {
  if (notification) {
    const errorsMap = Object.keys(response.data.errors);
    const errorsArray = response.data.errors;
    errorsMap.map((item, index) => {
      (0, _NotificationManager.default)(pushToastList, "error", t, response.status, errorsArray[item][0]);
    });
  }
};