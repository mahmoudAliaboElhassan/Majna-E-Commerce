"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.helperStyle = exports.ErrorContainer = void 0;

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _core = require("@material-ui/core");

var _theme = require("../theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ErrorContainer = (0, _styled["default"])(_core.Container)(function () {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  };
});
exports.ErrorContainer = ErrorContainer;
var helperStyle = {
  color: _theme.Colors.labelError,
  fontSize: "0.75rem",
  lineHeight: "24px"
};
exports.helperStyle = helperStyle;