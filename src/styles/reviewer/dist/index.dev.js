"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PdfContainer = exports.DrawerContainer = exports.DrawerHeader = exports.AppBarReviwer = exports.MainBody = void 0;

var _styles = require("@mui/material/styles");

var _AppBar = _interopRequireDefault(require("@mui/material/AppBar"));

var _Drawer = _interopRequireDefault(require("@mui/material/Drawer"));

var _material = require("@mui/material");

var _useDirection = _interopRequireDefault(require("@hooks/use-direction"));

var _useTheme = _interopRequireDefault(require("@hooks/use-theme"));

var _theme = require("@styles/theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var drawerWidth = 240;
var MainBody = (0, _styles.styled)("main", {
  shouldForwardProp: function shouldForwardProp(prop) {
    return prop !== "open";
  }
})(function (_ref) {
  var theme = _ref.theme,
      open = _ref.open;

  var _UseDirection = (0, _useDirection["default"])(),
      Direction = _UseDirection.Direction;

  return _objectSpread(_defineProperty({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }, Direction.marginLeft, "-".concat(drawerWidth, "px")), open && _defineProperty({
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  }, Direction.marginLeft, 0));
});
exports.MainBody = MainBody;
var AppBarReviwer = (0, _styles.styled)(_AppBar["default"], {
  shouldForwardProp: function shouldForwardProp(prop) {
    return prop !== "open";
  }
})(function (_ref3) {
  var theme = _ref3.theme,
      open = _ref3.open;

  var _UseDirection2 = (0, _useDirection["default"])(),
      Direction = _UseDirection2.Direction;

  return _objectSpread({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }, open && {
    // width: `calc(100% - ${drawerWidth}px)`,
    // [Direction.marginLeft]: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  });
});
exports.AppBarReviwer = AppBarReviwer;
var DrawerHeader = (0, _styles.styled)("div")(function (_ref4) {
  var theme = _ref4.theme;
  return _objectSpread({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1)
  }, theme.mixins.toolbar, {
    justifyContent: "flex-end"
  });
});
exports.DrawerHeader = DrawerHeader;
var DrawerContainer = (0, _styles.styled)(_Drawer["default"])(function () {
  var _UseThemMode = (0, _useTheme["default"])(),
      themeMode = _UseThemMode.themeMode;

  return {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      backgroundColor: themeMode === "dark" ? _theme.Colors.lightblack : _theme.Colors.primary,
      zIndex: 2,
      color: _theme.Colors.white,
      marginTop: "50px"
    }
  };
});
exports.DrawerContainer = DrawerContainer;
var PdfContainer = (0, _styles.styled)(_material.Card)(function (_ref5) {
  var theme = _ref5.theme;

  var _UseThemMode2 = (0, _useTheme["default"])(),
      themeMode = _UseThemMode2.themeMode;

  return {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: "1px solid ".concat(themeMode == "dark" ? _theme.Colors.light_gray : _theme.Colors.shaft),
    borderRadius: "8px",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1)
  };
});
exports.PdfContainer = PdfContainer;