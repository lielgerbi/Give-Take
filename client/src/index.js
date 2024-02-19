import "./bootstrap-custom.css";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import GlobalContextProvider from "./GlobalContext";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { HashRouter as Router } from "react-router-dom";

library.add(fas, far, fab);

ReactDOM.render(
  <GlobalContextProvider>
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
 </GlobalContextProvider>,
  document.getElementById("root")
);
