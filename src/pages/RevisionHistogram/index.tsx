import * as React from "react";
import { LanguageSelect } from "../../components/LanguageSelect";
import { TextLengthHistogram } from "./TextLengthHistogram";
import { RevisionCountHistogram } from "./RevisionCountHistogram";
import { LastEditedHistogram } from "./LastEditedHistogram";

const CURRENT_LANGUAGES = [
  { id: "rmy", name: "Romani" },
  { id: "pih", name: "Norfolk Island" },
  { id: "tn", name: "Setswana" }
];

const RevisionHistogramPage = () => {
  const [language, setLanguage] = React.useState("");
  return (
    <React.Fragment>
      <LanguageSelect languages={CURRENT_LANGUAGES} setLanguage={setLanguage} />
      <LastEditedHistogram language={language} header="Last Edited" />
      <RevisionCountHistogram
        language={language}
        header="Number of Revisions"
      />
      <TextLengthHistogram language={language} header="Article Length" />
    </React.Fragment>
  );
};

export default RevisionHistogramPage;
