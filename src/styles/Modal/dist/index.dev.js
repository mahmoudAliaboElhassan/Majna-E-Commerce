"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoxModal = void 0;

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _material = require("@mui/material");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BoxModal = (0, _styled["default"])(_material.Box)(function () {
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
});
exports.BoxModal = BoxModal;