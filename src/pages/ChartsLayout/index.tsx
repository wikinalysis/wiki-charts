import * as React from "react";
import { Container, Grid } from "@material-ui/core";
import api from "../../api";
import { LanguageSelect } from "../../components/LanguageSelect";
import { LanguageContext } from "../../contexts/LanguageContext";
import { Link } from "react-router-dom";

// Minor MUI
export const ChartsLayout: React.FC = ({ children }) => {
  const [_, setLanguage] = React.useContext(LanguageContext);
  const [languages, setLanguages] = React.useState([] as any[]);
  React.useEffect(() => {
    api.getCurrentWikis({}).then(response => {
      const data = response.data.map((wiki: any) => ({
        ...wiki,
        value: wiki.id,
        label: `${wiki.language} (${wiki.languageLocal})`
      }));
      setLanguages(data);
      setLanguage(data[0].value);
    });
  }, []);
  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          <LanguageSelect languages={languages} setLanguage={setLanguage} />
        </Grid>
        <Grid item xs={6}>
          <Link to="/charts/last-edited">Last Edited</Link>
          <Link to="/charts/activity">Activity</Link>
          <Link to="/charts/length">Article Length</Link>
        </Grid>
      </Grid>
      {children}
    </Container>
  );
};
