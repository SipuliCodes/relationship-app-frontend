import ReactDOM from "react-dom/client";

import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { BrowserRouter } from "react-router-dom";

import { msalConfig } from "./authConfig";
import App from "./App";

import "./index.css";

const msalInstance = new PublicClientApplication(msalConfig);

if (
  !msalInstance.getActiveAccount() &&
  msalInstance.getAllAccounts().length > 0
) {
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event) => {
  if (event.payload && "account" in event.payload) {
    if (
      (event.eventType === EventType.LOGIN_SUCCESS ||
        event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
        event.eventType === EventType.SSO_SILENT_SUCCESS) &&
      event.payload.account
    ) {
      msalInstance.setActiveAccount(event.payload.account);
    }
  }
});

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <App instance={msalInstance} />
    </BrowserRouter>,
  );
} else {
  console.error("Root element not found. Unable to render React application.");
}
