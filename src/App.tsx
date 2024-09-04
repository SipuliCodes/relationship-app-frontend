import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { MsalProvider, useMsal } from "@azure/msal-react";
import {
  IPublicClientApplication,
  AccountInfo,
  SilentRequest,
  EventMessage,
  EventType,
  AuthenticationResult,
} from "@azure/msal-browser";

import { PageLayout } from "./components/PageLayout";
import { b2cPolicies, protectedResources } from "./authConfig";
import { compareIssuingPolicy } from "./utils/claimUtils";

import "./App.css";
import HomePage from "./components/HomePage";
import CalendarPage from "./components/CalendarPage/CalendarPage";

interface TokenClaims {
  [key: string]: string | number;
}

const Pages: React.FC = () => {
  const { instance } = useMsal();

  useEffect(() => {
    const callbackId = instance.addEventCallback((event: EventMessage) => {
      if (
        (event.eventType === EventType.LOGIN_SUCCESS ||
          event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
        event.payload &&
        (event.payload as AuthenticationResult).account
      ) {
        const authResult = event.payload as AuthenticationResult;

        if (
          authResult.idTokenClaims &&
          compareIssuingPolicy(
            authResult.idTokenClaims as TokenClaims,
            b2cPolicies.names.signUpSignIn,
          )
        ) {
          const originalSignInAccount = instance
            .getAllAccounts()
            .find((account: AccountInfo) => {
              const claims = account.idTokenClaims as TokenClaims;
              return (
                claims?.oid ===
                  (authResult.idTokenClaims as TokenClaims)?.oid &&
                claims?.sub ===
                  (authResult.idTokenClaims as TokenClaims)?.sub &&
                compareIssuingPolicy(claims, b2cPolicies.names.signUpSignIn)
              );
            });

          const signUpSignInFlowRequest: SilentRequest = {
            authority: b2cPolicies.authorities.signUpSignIn.authority,
            account: originalSignInAccount,
            scopes: protectedResources.apiRelationshipApp.scopes.read,
          };

          instance.ssoSilent(signUpSignInFlowRequest).catch((error) => {
            console.error("SSO Silent login failed", error);
          });
        }
      }
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance]);

  return (
    <Routes>
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

interface AppProps {
  instance: IPublicClientApplication;
}

const App: React.FC<AppProps> = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <PageLayout>
        <Pages />
      </PageLayout>
    </MsalProvider>
  );
};

export default App;
