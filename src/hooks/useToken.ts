import { useContext } from "react";

import { TokenContext, TokenDispatchContext } from "../contexts/TokenContext";

export const useToken = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};

export const useSetToken = () => {
  const context = useContext(TokenDispatchContext);
  if (context === undefined) {
    throw new Error("useSetToken must be used within a TokenProvider");
  }
  return context;
};
