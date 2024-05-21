"use strict";

var _react = require("react");

var _i18next = _interopRequireDefault(require("i18next"));

var _reactI18next = require("react-i18next");

var _i18nextHttpBackend = _interopRequireDefault(require("i18next-http-backend"));

var _i18nextBrowserLanguagedetector = _interopRequireDefault(require("i18next-browser-languagedetector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_i18next["default"].use(_i18nextHttpBackend["default"]).use(_i18nextBrowserLanguagedetector["default"]).use(_reactI18next.initReactI18next).init({
  supportedLngs: ["en", "ar"],
  fallbackLng: "en",
  debug: false,
  // Options for language detector
  detection: {
    order: ["path", "cookie", "htmlTag"],
    caches: ["cookie"]
  },
  react: {
    useSuspense: false
  },
  backend: {
    loadPath: "/assets/locales/{{lng}}/translation.json"
  }
});