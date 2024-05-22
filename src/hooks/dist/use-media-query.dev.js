"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _material = require("@mui/material");

var _react2 = require("@emotion/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function UseMediaQueryHook() {
  var theme = (0, _react2.useTheme)();
  var isMatch = (0, _material.useMediaQuery)(theme.breakpoints.down("md"));
  return {
    isMatch: isMatch
  };
}

var _default = UseMediaQueryHook;
exports["default"] = _default;