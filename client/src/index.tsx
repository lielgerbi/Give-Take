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
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

library.add(fas, far, fab);

ReactDOM.render(
  <GoogleOAuthProvider clientId="your-client-id">
    <GlobalContextProvider>
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    </GlobalContextProvider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);



// import "./bootstrap-custom.css";
// import "./index.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import GlobalContextProvider from "./GlobalContext";
// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import { far } from "@fortawesome/free-regular-svg-icons";
// import { fab } from "@fortawesome/free-brands-svg-icons";
// import { BrowserRouter  as Router } from "react-router-dom";
// import { GoogleOAuthProvider } from '@react-oauth/google';

// library.add(fas, far, fab);

// ReactDOM.render(
//   <GoogleOAuthProvider clientId="496029806986-ebqe5171djukbe8a4rtkd93q8ta2tlll.apps.googleusercontent.com">
//   <GlobalContextProvider>
//   <React.StrictMode>
//     <Router>
//       <App />
//     </Router>
//   </React.StrictMode>
//  </GlobalContextProvider>
//  </GoogleOAuthProvider>,
//   document.getElementById("root")
// );
