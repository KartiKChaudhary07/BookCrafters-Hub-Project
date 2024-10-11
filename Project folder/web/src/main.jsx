import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId='535819166260-33mjd5f3h7or8diarmqtr4m2h88gpg1l.apps.googleusercontent.com'>

    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
