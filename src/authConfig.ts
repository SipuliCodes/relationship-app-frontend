import { LogLevel } from "@azure/msal-browser";

export const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1_signupsignin",
  },
  authorities: {
    signUpSignIn: {
      authority:
        "https://relationshipappusers.b2clogin.com/relationshipappusers.onmicrosoft.com/b2c_1_signupsignin",
    },
  },
  authorityDomain: "relationshipappusers.b2clogin.com",
};

export const msalConfig = {
  auth: {
    clientId: "faf553d8-0611-48e4-a15b-2a7cfbc14889",
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: "/",
    postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (
        level: LogLevel,
        message: string,
        containsPii: boolean,
      ) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const protectedResources = {
  apiRelationshipApp: {
    endpoint: "http://localhost:5000/api/relationshipapp",
    scopes: {
      read: [
        "https://relationshipappusers.onmicrosoft.com/relationshipapp-api/relationshipapp.read",
      ],
      write: [
        "https://relationshipappusers.onmicrosoft.com/relationshipapp-api/relationshipapp.write",
      ],
    },
  },
};

export const loginRequest = {
  scopes: [
    ...protectedResources.apiRelationshipApp.scopes.read,
    ...protectedResources.apiRelationshipApp.scopes.write,
  ],
};
