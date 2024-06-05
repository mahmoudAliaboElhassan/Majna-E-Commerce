"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawerButton = exports.ProducDetailInfoWrapper = exports.ProducDetailWrapper = void 0;

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _material = require("@mui/material");

var _useTheme = _interopRequireDefault(require("../../hooks/use-theme"));

var _theme = require("../theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ProducDetailWrapper = (0, _styled["default"])(_material.Box)(function (_ref) {
  var theme = _ref.theme,
      matches = _ref.matches;
  return {
    display: "flex",
    padding: theme.spacing(4),
    flexDirection: "column" // Adjust as needed

  };
});
exports.ProducDetailWrapper = ProducDetailWrapper;
var ProducDetailInfoWrapper = (0, _styled["default"])(_material.Box)(function () {
  return {
    display: "flex",
    flexDirection: "column",
    maxWidth: 500,
    lineHeight: 1.5,
    textAlign: "center"
  };
});
exports.ProducDetailInfoWrapper = ProducDetailInfoWrapper;
var DrawerButton = (0, _styled["default"])("button")(function () {
  var _UseThemMode = (0, _useTheme["default"])(),
      themeMode = _UseThemMode.themeMode;

  return {
    height: "220vh",
    backgroundColor: themeMode === "dark" ? _theme.Colors.lightblack : _theme.Colors.primary,
    color: _theme.Colors.white,
    position: "relative",
    top: "-22px"
  };
});
exports.DrawerButton = DrawerButton;