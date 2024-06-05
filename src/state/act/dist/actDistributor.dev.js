"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addProduct = exports.getCategories = exports.getSubCategory = exports.getStore = exports.getStores = exports.editStore = exports.addStore = exports.getAtuthorizedBrands = exports.getAllBrandsApplication = exports.fetchGovernance = exports.fetchPrands = exports.addBrand = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _globalApi = require("@state/API/global-api");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var addBrand = (0, _toolkit.createAsyncThunk)("distributorSlice/addBrand", function _callee(_ref, thunkAPI) {
  var Uid, authorization_doc, identity_doc, rejectWithValue, res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Uid = _ref.Uid, authorization_doc = _ref.authorization_doc, identity_doc = _ref.identity_doc;
          rejectWithValue = thunkAPI.rejectWithValue;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(_globalApi.majnaFiles.post("api/brands/".concat(Uid, "/applications"), {
            authorization_doc: authorization_doc,
            identity_doc: identity_doc
          } // {
          //   headers: {
          //     Authorization: `Token ${localStorage.getItem("token")}`,
          //     Accept: "application/json",
          //     "Content-Type":
          //       'multipart/form-data; charset=utf-8; boundary="another cool boundary";',
          //     // many kind of data
          //   },
          // }
          ));

        case 5:
          res = _context.sent;
          console.log("from slice res is");
          console.log(res);
          console.log(res);
          return _context.abrupt("return", res);

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](2);

          if (_context.t0.response && _context.t0.response.status === 400) {
            // Handle 403 error here
            // Example: setConfirmed(true);
            console.log("400 Forbidden - User not authorized from slice");
          }

          return _context.abrupt("return", rejectWithValue(_context.t0));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 12]]);
});
exports.addBrand = addBrand;
var fetchPrands = (0, _toolkit.createAsyncThunk)("distributorSlice/fetchPrands", function _callee2(_, thunkAPI) {
  var rejectWithValue, res;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          rejectWithValue = thunkAPI.rejectWithValue;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_globalApi.majnAPI.get("api/brands" //  {
          //   headers: {
          //     // "Content-Type": "application/json",
          //   },
          // }
          ));

        case 4:
          res = _context2.sent;
          console.log("from slice res is");
          console.log(res);
          return _context2.abrupt("return", res);

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](1);

          if (_context2.t0.response && _context2.t0.response.status === 400) {
            // Handle 403 error here
            // Example: setConfirmed(true);
            console.log("400 Forbidden - User not authorized from slice");
          }

          return _context2.abrupt("return", rejectWithValue(_context2.t0));

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
exports.fetchPrands = fetchPrands;
var fetchGovernance = (0, _toolkit.createAsyncThunk)("distributorSlice/fetchGovernance", function _callee3(_, thunkAPI) {
  var rejectWithValue, res;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          rejectWithValue = thunkAPI.rejectWithValue;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_globalApi.majnAPI.get("api/locations/governorates"));

        case 4:
          res = _context3.sent;
          console.log("from slice res is");
          console.log(res);
          return _context3.abrupt("return", res);

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);

          if (_context3.t0.response && _context3.t0.response.status === 400) {
            // Handle 403 error here
            // Example: setConfirmed(true);
            console.log("400 Forbidden - User not authorized from slice");
          }

          return _context3.abrupt("return", rejectWithValue(_context3.t0));

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
exports.fetchGovernance = fetchGovernance;
var getAllBrandsApplication = (0, _toolkit.createAsyncThunk)("distributorSlice/getAllBrandsApplication", function _callee4(_ref2, thunkAPI) {
  var Uid, rejectWithValue, res;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          Uid = _ref2.Uid;
          rejectWithValue = thunkAPI.rejectWithValue;
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(_globalApi.majnAPI.get("api/distributors/".concat(Uid, "/brands-applications") // {
          //   headers: {
          //     "Content-Type": "application/json",
          //     Authorization: `Token ${localStorage.getItem("token")}`,
          //   },
          // }
          ));

        case 5:
          res = _context4.sent;
          console.log("From Slice all applications");
          console.log(res);
          return _context4.abrupt("return", res);

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](2);

          if (_context4.t0.response && _context4.t0.response.status === 400) {
            // Handle 403 error here
            // Example: setConfirmed(true);
            console.log("400 Forbidden - User not authorized from slice");
          }

          return _context4.abrupt("return", rejectWithValue(_context4.t0));

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 11]]);
});
exports.getAllBrandsApplication = getAllBrandsApplication;
var getAtuthorizedBrands = (0, _toolkit.createAsyncThunk)("distributorSlice/getAtuthorizedBrands", function _callee5(_ref3, thunkAPI) {
  var Uid, rejectWithValue, res;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          Uid = _ref3.Uid;
          rejectWithValue = thunkAPI.rejectWithValue;
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(_globalApi.majnAPI.get("api/distributors/".concat(Uid, "/brands") // {
          //   headers: {
          //     // "Content-Type": "application/json",
          //     // Authorization: `Token ${localStorage.getItem("token")}`,
          //   },
          // }
          ));

        case 5:
          res = _context5.sent;
          console.log("from slice res is");
          console.log(res);
          return _context5.abrupt("return", res);

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](2);

          if (_context5.t0.response && _context5.t0.response.status === 400) {
            // Handle 403 error here
            // Example: setConfirmed(true);
            console.log("400 Forbidden - User not authorized from slice");
          }

          return _context5.abrupt("return", rejectWithValue(_context5.t0));

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 11]]);
});
exports.getAtuthorizedBrands = getAtuthorizedBrands;
var addStore = (0, _toolkit.createAsyncThunk)("distributorSlice/addStore", function _callee6(_ref4, thunkAPI) {
  var Uid, rest, rejectWithValue, res;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          Uid = _ref4.Uid, rest = _objectWithoutProperties(_ref4, ["Uid"]);
          rejectWithValue = thunkAPI.rejectWithValue;
          _context6.prev = 2;
          _context6.next = 5;
          return regeneratorRuntime.awrap(_globalApi.majnAPI.post("api/distributors/".concat(Uid, "/stores"), rest // {
          //   headers: {
          //     // "Content-Type": "application/json",
          //     // Authorization: `Token ${localStorage.getItem("token")}`,
          //   },
          // }
          ));

        case 5:
          res = _context6.sent;
          console.log("from slice res is");
          console.log(res);
          return _context6.abrupt("return", res);

        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](2);

          if (_context6.t0.response && _context6.t0.response.status === 400) {
            // Handle 403 error here
            // Example: setConfirmed(true);
            console.log("400 Forbidden - User not authorized from slice");
          }

          return _context6.abrupt("return", rejectWithValue(_context6.t0));

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[2, 11]]);
});
exports.addStore = addStore;
var editStore = (0, _toolkit.createAsyncThunk)("distributorSlice/editStore", function _callee7(_ref5, thunkAPI) {
  var Uid, storeId, rest, rejectWithValue, res;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          Uid = _ref5.Uid, storeId = _ref5.storeId, rest = _objectWithoutProperties(_ref5, ["Uid", "storeId"]);
          rejectWithValue = thunkAPI.rejectWithValue;
          _context7.prev = 2;
          _context7.next = 5;
          return regeneratorRuntime.awrap(_globalApi.majnAPI.patch("api/distributors/".concat(Uid, "/stores/").concat(storeId), rest));

        case 5:
          res = _context7.sent;
          console.log("from slice res is");
          console.log(res);
          return _context7.abrupt("return", res);

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](2);

          if (_context7.t0.response && _context7.t0.response.status === 400) {
            // Handle 403 error here
            // Example: setConfirmed(true);
            console.log("400 Forbidden - User not authorized from slice");
          }

          return _context7.abrupt("return", rejectWithValue(_context7.t0));

        case 15:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[2, 11]]);
});
exports.editStore = editStore;
var getStores = (0, _toolkit.createAsyncThunk)("distributorSlice/getStores", function _callee8(_ref6, thunkAPI) {
  var Uid, rejectWithValue, res;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          Uid = _ref6.Uid;
          rejectWithValue = thunkAPI.rejectWithValue;
          _context8.prev = 2;
          _context8.next = 5;
          return regeneratorRuntime.awrap(_globalApi.majnAPI.get("api/distributors/".concat(Uid, "/stores")));

        case 5:
          res = _context8.sent;
          console.log("from slice res is");
          console.log(res);
          return _context8.abrupt("return", res);

        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](2);

          if (_context8.t0.response && _context8.t0.response.status === 400) {
            // Handle 403 error here
            // Example: setConfirmed(true);
            console.log("400 Forbidden - User not authorized from slice");
          }

          return _context8.abrupt("return", rejectWithValue(_context8.t0));

        case 15:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[2, 11]]);
});
exports.getStores = getStores;
var getStore = (0, _toolkit.createAsyncThunk)("distributorSlice/getStore", function _callee9(_ref7, thunkAPI) {
  var Uid, storeId, rejectWithValue, res;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          Uid = _ref7.Uid, storeId = _ref7.storeId;
          rejectWithValue = thunkAPI.rejectWithValue;
          _context9.prev = 2;
          _context9.next = 5;
          return regeneratorRuntime.awrap(_globalApi.majnAPI.get("api/distributors/".concat(Uid, "/stores/").concat(storeId)));

        case 5:
          res = _context9.sent;
          console.log("from slice res is");
          console.log(res);
          return _context9.abrupt("return", res);

        case 11:
          _context9.prev = 11;
          _context9.t0 = _context9["catch"](2);

          if (_context9.t0.response && _context9.t0.response.status === 400) {
            // Handle 403 error here
            // Example: setConfirmed(true);
            console.log("400 Forbidden - User not authorized from slice");
          }

          return _context9.abrupt("return", rejectWithValue(_context9.t0));

        case 15:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[2, 11]]);
});
exports.getStore = getStore;
var getSubCategory = (0, _toolkit.createAsyncThunk)("distributorSlice/getSubCategory", function _callee10(_, thunkAPI) {
  var rejectWithValue, res;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          rejectWithValue = thunkAPI.rejectWithValue;
          _context10.prev = 1;
          _context10.next = 4;
          return regeneratorRuntime.awrap(_globalApi.majnAPI.get("api/products/sub-categories"));

        case 4:
          res = _context10.sent;
          console.log("from slice res is");
          console.log(res);
          return _context10.abrupt("return", res);

        case 10:
          _context10.prev = 10;
          _context10.t0 = _context10["catch"](1);

          if (_context10.t0.response && _context10.t0.response.status === 400) {
            // Handle 403 error here
            // Example: setConfirmed(true);
            console.log("400 Forbidden - User not authorized from slice");
          }

          return _context10.abrupt("return", rejectWithValue(_context10.t0));

        case 14:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
exports.getSubCategory = getSubCategory;
var getCategories = (0, _toolkit.createAsyncThunk)("distributorSlice/getCategories", function _callee11(_, thunkAPI) {
  var rejectWithValue, res;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          rejectWithValue = thunkAPI.rejectWithValue;
          _context11.prev = 1;
          _context11.next = 4;
          return regeneratorRuntime.awrap(_globalApi.majnAPI.get("api/products/categories"));

        case 4:
          res = _context11.sent;
          console.log("from slice res is");
          console.log(res);
          return _context11.abrupt("return", res);

        case 10:
          _context11.prev = 10;
          _context11.t0 = _context11["catch"](1);

          if (_context11.t0.response && _context11.t0.response.status === 400) {
            // Handle 403 error here
            // Example: setConfirmed(true);
            console.log("400 Forbidden - User not authorized from slice");
          }

          return _context11.abrupt("return", rejectWithValue(_context11.t0));

        case 14:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
exports.getCategories = getCategories;
var addProduct = (0, _toolkit.createAsyncThunk)("distributorSlice/addProduct", function _callee12(productData, thunkAPI) {
  var rejectWithValue, res;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          console.log(_objectSpread({}, productData));
          rejectWithValue = thunkAPI.rejectWithValue;
          _context12.prev = 2;
          _context12.next = 5;
          return regeneratorRuntime.awrap(_globalApi.majnaFiles.post("api/products", productData));

        case 5:
          res = _context12.sent;
          console.log("from slice res is");
          console.log(res);
          return _context12.abrupt("return", res);

        case 11:
          _context12.prev = 11;
          _context12.t0 = _context12["catch"](2);

          if (_context12.t0.response && _context12.t0.response.status === 400) {
            // Handle 403 error here
            // Example: setConfirmed(true);
            console.log("400 Forbidden - User not authorized from slice");
          } else if (_context12.t0.response && _context12.t0.response.status === 500) {
            console.log(_context12.t0.message);
          }

          return _context12.abrupt("return", rejectWithValue(_context12.t0));

        case 15:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[2, 11]]);
});
exports.addProduct = addProduct;