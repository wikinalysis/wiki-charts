import * as React from "react";
import api from "../api";

export interface WikiContextValue {
  [index: string]: {
    id: string;
    language: string;
    languageLocal: string;
    articleCount: number;
  };
}

export const WikiContext: React.Context<WikiContextValue> = React.createContext(
  {}
);

export const WikiProvider: React.FC = props => {
  const [wikis, setWikis] = React.useState({});
  React.useEffect(() => {
    api
      .getCurrentWikis({})
      .then(response =>
        setWikis(
          response.data.reduce((acc, val) => ({ ...acc, [val.id]: val }), {})
        )
      );
  }, [setWikis]);
  return (
    <WikiContext.Provider value={wikis}>{props.children}</WikiContext.Provider>
  );
};
