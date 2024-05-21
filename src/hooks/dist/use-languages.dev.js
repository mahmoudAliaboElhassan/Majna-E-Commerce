"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function UseLanguages() {
  var Languages = [{
    code: "en",
    name: "English",
    country_code: "us"
  }, {
    code: "ar",
    name: "عربي",
    country_code: "eg",
    dir: "rtl"
  }];
  return {
    Languages: Languages
  };
}

var _default = UseLanguages;
exports["default"] = _default;