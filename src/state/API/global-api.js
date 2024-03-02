import axios from "axios";

export const majnAPI = axios.create({
  baseURL: "https://majna.onrender.com/",
});
export const majnaFiles = axios.create({
  baseURL: "https://majna.onrender.com/",
  // headers: {
  //   "Content-Type":
  //     'multipart/form-data; charset=utf-8; boundary="another cool boundary";',
  // },
});
const token = localStorage.getItem("token");

majnaFiles.interceptors.request.use(
  function (config) {
    console.log("token");
    console.log(localStorage.getItem("token"));
    config.headers["Content-Type"] =
      'multipart/form-data; charset=utf-8; boundary="another cool boundary";';
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] = `Token ${localStorage.getItem(
        "token"
      )}`;
    }
    console.log("config");
    console.log(config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
majnAPI.interceptors.request.use(
  function (config) {
    console.log("token");
    console.log(token);
    config.headers["Content-Type"] = "application/json";
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] = `Token ${localStorage.getItem(
        "token"
      )}`;
    }
    console.log("config");
    console.log(config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
majnaFiles.interceptors.response.use(
  function (response) {
    // Do something with response data
    console.log("response");
    console.log(response);
    return response.data;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
majnAPI.interceptors.response.use(
  function (response) {
    // Do something with response data
    console.log("response");
    console.log(response);
    return response.data;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
