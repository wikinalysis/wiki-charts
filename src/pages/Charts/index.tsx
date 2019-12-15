import * as React from "react";
import { ChartsLayout } from "../ChartsLayout";
import { Switch, Route } from "react-router-dom";
import { LastEditedHistogram } from "../../charts/LastEditedHistogram";
import { RevisionCountHistogram } from "../../charts/RevisionCountHistogram";
import { TextLengthHistogram } from "../../charts/TextLengthHistogram";
import { LanguageContext } from "../../contexts/LanguageContext";

export const Charts: React.FC = ({ children }) => {
  const [language, _] = React.useContext(LanguageContext);
  return (
    <ChartsLayout>
      <Switch>
        <Route path="/charts/last-edited">
          <h1>Latest Revision</h1>
          <LastEditedHistogram language={language} />
        </Route>
        <Route path="/charts/activity">
          <h1>Total Revisions</h1>
          <RevisionCountHistogram language={language} />
        </Route>
        <Route path="/charts/length">
          <h1>Article Length</h1>
          <TextLengthHistogram language={language} />
        </Route>
      </Switch>
    </ChartsLayout>
  );
};
