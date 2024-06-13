"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activate = exports["default"] = exports.activeLinkSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _useInitialState = _interopRequireDefault(require("@hooks/use-initial-state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _UseInitialStates = (0, _useInitialState["default"])(),
    initialStateActiveLinks = _UseInitialStates.initialStateActiveLinks;

var activeLinkSlice = (0, _toolkit.createSlice)({
  name: "activeLinkSlice",
  initialState: initialStateActiveLinks,
  reducers: {
    activate: function activate(state, action) {
      sessionStorage.setItem("activeLink", action.payload);
      state.activeLink = sessionStorage.getItem("activeLink");
    }
  }
});
exports.activeLinkSlice = activeLinkSlice;
var _default = activeLinkSlice.reducer;
exports["default"] = _default;
var activate = activeLinkSlice.actions.activate;
exports.activate = activate;