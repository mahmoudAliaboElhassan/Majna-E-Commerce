"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.majnaFiles = exports.majnAPI = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Function to create Axios instances with common settings
function createAxiosInstance(baseURL, contentType) {
  var instance = _axios["default"].create({
    baseURL: baseURL
  }); // Request interceptor function


  var requestInterceptor = function requestInterceptor(config) {
    console.log("token");
    console.log(localStorage.getItem("token"));
    config.headers["Content-Type"] = contentType;

    if (localStorage.getItem("token")) {
      config.headers["Authorization"] = "Token ".concat(localStorage.getItem("token"));
    }

    console.log("config");
    console.log(config);
    return config;
  }; // Response interceptor function


  var responseInterceptor = function responseInterceptor(response) {
    console.log("response");
    console.log(response);
    return response.data;
  }; // Error handler for request interceptor


  var requestErrorInterceptor = function requestErrorInterceptor(error) {
    console.error("Request error");
    console.error(error);
    return Promise.reject(error);
  }; // Error handler for response interceptor


  var responseErrorInterceptor = function responseErrorInterceptor(error) {
    console.error("Response error");
    console.error(error);
    return Promise.reject(error);
  }; // Apply request interceptor


  instance.interceptors.request.use(requestInterceptor, requestErrorInterceptor); // Apply response interceptor

  instance.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
  return instance;
} // Create Axios instances for API and Files


var majnAPI = createAxiosInstance(process.env.REACT_APP_API_URL, "application/json");
exports.majnAPI = majnAPI;
var majnaFiles = createAxiosInstance(process.env.REACT_APP_API_URL, 'multipart/form-data; charset=utf-8; boundary="another cool boundary";');
exports.majnaFiles = majnaFiles;