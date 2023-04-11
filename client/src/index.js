import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth0";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0ProviderWithHistory>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0ProviderWithHistory>
  </React.StrictMode>
);
