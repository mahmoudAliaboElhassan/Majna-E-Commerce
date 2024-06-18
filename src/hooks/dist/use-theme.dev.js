"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("@emotion/react");

function UseThemMode() {
  var theme = (0, _react.useTheme)();
  var themeMode = theme.palette.mode;
  return {
    themeMode: themeMode
  };
}

var _default = UseThemMode;
exports["default"] = _default;