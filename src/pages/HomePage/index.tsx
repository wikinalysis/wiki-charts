import * as React from "react";

export const HomePage: React.FC = ({ children }) => {
  return (
    <>
      <h1>Home Page</h1>
      {children}
    </>
  );
};
