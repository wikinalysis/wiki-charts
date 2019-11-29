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
      <LastEditedHistogram language={language} />
      <RevisionCountHistogram language={language} />
      <TextLengthHistogram language={language} />
    </React.Fragment>
  );
};

export default RevisionHistogramPage;
