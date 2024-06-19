"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntroudctoryButton = void 0;

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _material = require("@mui/material");

var _react = require("@emotion/react");

var _theme = require("@styles/theme");

var _useTheme = _interopRequireDefault(require("@hooks/use-theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var IntroudctoryButton = (0, _styled["default"])(_material.Button)(function () {
  var _UseThemMode = (0, _useTheme["default"])(),
      themeMode = _UseThemMode.themeMode;

  var theme = (0, _react.useTheme)();
  return {
    display: "inline-flex",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "1rem",
    marginBottom: "1rem",
    backgroundColor: themeMode === "dark" ? "#f5f5f5" : "#333",
    color: themeMode === "dark" ? "#333" : "#fff",
    transition: "background-color 0.3s, color 0.3s",
    "&:hover": {
      backgroundColor: themeMode === "dark" ? "#ddd" : "#2b1f1f",
      color: themeMode === "dark" ? "#333" : "#fff"
    },
    "&:hover .icon": {
      transform: theme.direction === "ltr" ? "translateX(3px)" : "translateX(-3px)"
    }
  };
});
exports.IntroudctoryButton = IntroudctoryButton;