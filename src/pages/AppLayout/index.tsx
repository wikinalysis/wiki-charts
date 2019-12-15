import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { LanguageProvider } from "../../contexts/LanguageContext";
import theme from "./theme";

export const AppLayout: React.FC = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LanguageProvider>
          <CssBaseline />
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
