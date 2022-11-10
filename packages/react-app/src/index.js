import "./index.css";

import {DAppProvider} from "@usedapp/core";
import {DAPP_CONFIG} from "./config";
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.render(
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <ErrorBoundary>
      <DAppProvider config={DAPP_CONFIG}>
          <App/>
      </DAppProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
