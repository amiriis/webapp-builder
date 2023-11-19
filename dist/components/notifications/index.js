"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _NotificationManager = require("./NotificationManager");
Object.keys(_NotificationManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _NotificationManager[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _NotificationManager[key];
    }
  });
});
var _ErrorNotification = require("./ErrorNotification");
Object.keys(_ErrorNotification).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ErrorNotification[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ErrorNotification[key];
    }
  });
});
var _PendingNotification = require("./PendingNotification");
Object.keys(_PendingNotification).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _PendingNotification[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PendingNotification[key];
    }
  });
});
var _SuccessNotification = require("./SuccessNotification");
Object.keys(_SuccessNotification).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SuccessNotification[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SuccessNotification[key];
    }
  });
});
var _WarningNotification = require("./WarningNotification");
Object.keys(_WarningNotification).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _WarningNotification[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WarningNotification[key];
    }
  });
});
var _UploadFileNotification = require("./UploadFileNotification");
Object.keys(_UploadFileNotification).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _UploadFileNotification[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _UploadFileNotification[key];
    }
  });
});
//# sourceMappingURL=index.js.map