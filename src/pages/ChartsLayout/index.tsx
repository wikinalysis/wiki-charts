import * as React from "react";
import { Container, Grid, Button } from "@material-ui/core";
import api from "../../api";
import { LanguageSelect } from "../../components/LanguageSelect";
import { LanguageContext } from "../../contexts/LanguageContext";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

// Major MUI
const useStyles = makeStyles(theme => ({
  button: {
    alignSelf: "center"
  }
}));

// Minor MUI
export const ChartsLayout: React.FC = ({ children }) => {
  const [_, setLanguage] = React.useContext(LanguageContext);
  const history = useHistory();
  const classes = useStyles();
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
        <Grid item xs={10}>
          {languages.length > 0 ? (
            <LanguageSelect
              languages={languages}
              setLanguage={setLanguage}
              initialLanguage={languages[0]}
            />
          ) : null}
        </Grid>
        <Grid item className={classes.button}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => history.push("/")}
          >
            Back Home
          </Button>
        </Grid>
      </Grid>
      {children}
    </Container>
  );
};
