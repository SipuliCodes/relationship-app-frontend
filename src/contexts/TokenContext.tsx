import React, { createContext, useState, useEffect, ReactNode } from "react";

export const TokenContext = createContext<string | undefined>(undefined);
export const TokenDispatchContext = createContext<
  React.Dispatch<React.SetStateAction<string | undefined>> | undefined
>(undefined);

interface TokenProviderProps {
  children: ReactNode;
}

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | undefined>(() => {
    return localStorage.getItem("authToken") || undefined;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    }
  }, [token]);

  return (
    <TokenContext.Provider value={token}>
      <TokenDispatchContext.Provider value={setToken}>
        {children}
      </TokenDispatchContext.Provider>
    </TokenContext.Provider>
  );
};
