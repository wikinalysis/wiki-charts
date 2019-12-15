import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { Charts } from "../Charts";
import { HomePage } from "../HomePage";
import { AppLayout } from "../AppLayout";

export const App: React.FC = () => {
  return (
    <AppLayout>
      <Switch>
        <Route path="/charts">
          <Charts />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </AppLayout>
  );
};
