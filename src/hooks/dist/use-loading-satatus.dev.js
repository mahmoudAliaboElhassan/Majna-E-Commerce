"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function UseLoadingStatus() {
  var _useSelector = (0, _reactRedux.useSelector)(function (state) {
    return state.auth;
  }),
      loading = _useSelector.loading;

  var _useSelector2 = (0, _reactRedux.useSelector)(function (state) {
    return state.distributor;
  }),
      loadingAddBrand = _useSelector2.loadingAddBrand,
      loadingStore = _useSelector2.loadingStore,
      loadingEdit = _useSelector2.loadingEdit,
      loadingAddProduct = _useSelector2.loadingAddProduct;

  var loadinStatus = loading || loadingAddBrand || loadingStore || loadingEdit || loadingAddProduct;
  return Boolean(loadinStatus);
}

var _default = UseLoadingStatus;
exports["default"] = _default;