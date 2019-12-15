import * as React from "react";

export const LanguageContext: React.Context<[
  string,
  (v: string) => void
]> = React.createContext(["", console.log]);

export const LanguageProvider: React.FC = ({ children }) => {
  const state = React.useState("");
  return (
    <LanguageContext.Provider value={state}>
      {children}
    </LanguageContext.Provider>
  );
};
