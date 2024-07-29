import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css"
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "mdb-ui-kit/css/mdb.min.css";

import "./translation/i18next.js";
import { store, persistor } from "./state/store.js";

import AppRouter from "./routes/AppRouter.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
