"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Textarea = void 0;

var _TextareaAutosize = require("@mui/base/TextareaAutosize");

var _system = require("@mui/system");

var _useTheme = _interopRequireDefault(require("@hooks/use-theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75"
};
var grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025"
};
var Textarea = (0, _system.styled)(_TextareaAutosize.TextareaAutosize)(function () {
  var _UseThemMode = (0, _useTheme["default"])(),
      themeMode = _UseThemMode.themeMode;

  return {
    boxSizing: "border-box",
    width: "100%",
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: "0.875rem",
    fontWeight: "400",
    lineHeight: "1.5",
    padding: "8px 12px",
    borderRadius: "8px",
    color: themeMode === "dark" ? grey[300] : grey[900],
    background: themeMode === "dark" ? grey[900] : "#fff",
    border: "1px solid ".concat(themeMode === "dark" ? grey[700] : grey[200]),
    boxShadow: "0px 2px 2px ".concat(themeMode === "dark" ? grey[900] : grey[50]),
    "&:hover::before": {
      borderColor: "".concat(blue[400])
    },
    "&:focus": {
      borderColor: "".concat(blue[400]),
      boxShadow: "0 0 0 3px ".concat(themeMode === "dark" ? blue[600] : blue[200])
    },
    // firefox
    "&:focus-visible": {
      outline: 0
    }
  };
});
exports.Textarea = Textarea;