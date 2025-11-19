import { Provider } from "react-redux"
import { createRoot } from "react-dom/client"

import { PersistGate } from "redux-persist/integration/react"
import "mdb-ui-kit/css/mdb.min.css"

import "./translation/i18next.js"
import { store, persistor } from "./state/store.js"
import { initSmoothScroll } from "./utils/smoothScroll.js"

import AppRouter from "./routes/AppRouter.jsx"
import "./index.css"

window.addEventListener("DOMContentLoaded", () => {
  const lenis = initSmoothScroll()
  window.lenis = lenis
})

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
)
