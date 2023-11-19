"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _errorHandler = require("./errorHandler");
Object.keys(_errorHandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _errorHandler[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _errorHandler[key];
    }
  });
});
var _succesHandler = require("./succesHandler");
Object.keys(_succesHandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _succesHandler[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _succesHandler[key];
    }
  });
});