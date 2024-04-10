import React  from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import "mdb-ui-kit/css/mdb.min.css";

import "./i18next.js";

import AppRouter from './routes/AppRouter.jsx'
import store from "./state/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}><AppRouter/></Provider>
  </React.StrictMode>
);

reportWebVitals();
