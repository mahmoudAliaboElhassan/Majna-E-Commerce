"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.products = exports.getProducts = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _useInitialState = _interopRequireDefault(require("@hooks/use-initial-state"));

var _axios = _interopRequireDefault(require("axios"));

var _globalApi = require("@state/API/global-api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var initialState = {
  products: []
};
var getProducts = (0, _toolkit.createAsyncThunk)("products/getProducts", function _callee(query, thunkAPI) {
  var rejectWithValue, entriesArray, queryParameters, _ref3, data;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          rejectWithValue = thunkAPI.rejectWithValue;
          entriesArray = Object.entries(query);
          console.log("entriesArray");
          console.log(entriesArray);
          queryParameters = entriesArray.map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                value = _ref2[1];

            return value ? "".concat(key, "=").concat(value) : null;
          }).filter(Boolean).join("&");
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(_globalApi.majnAPI.get("http://localhost:30001/products?".concat(queryParameters)));

        case 8:
          _ref3 = _context.sent;
          data = _ref3.data;
          return _context.abrupt("return", data);

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](5);

          if (_context.t0.response && _context.t0.response.status === 400) {
            // Handle 400 error here
            console.log("400 Bad Request - Error in the request");
          }

          return _context.abrupt("return", rejectWithValue(_context.t0));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 13]]);
});
exports.getProducts = getProducts;
var products = (0, _toolkit.createSlice)({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: function extraReducers(builder) {
    builder.addCase(getProducts.fulfilled, function (state, action) {
      state.products = action.payload;
      console.log(state.products);
    });
  }
});
exports.products = products;
var _default = products.reducer;
exports["default"] = _default;