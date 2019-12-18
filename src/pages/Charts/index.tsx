import * as React from "react";
import { Grid } from "@material-ui/core";
import { ChartsLayout } from "../ChartsLayout";
import { Switch, Route } from "react-router-dom";
import { Paper } from "../../components/Paper";
import { LastEditedHistogram } from "../../charts/LastEditedHistogram";
import { RevisionCountHistogram } from "../../charts/RevisionCountHistogram";
import { TextLengthHistogram } from "../../charts/TextLengthHistogram";
import { LanguageContext } from "../../contexts/LanguageContext";
import { makeStyles } from "@material-ui/core/styles";

// Major MUI
const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  }
}));

export const Charts: React.FC = ({ children }) => {
  const [language, _] = React.useContext(LanguageContext);
  const classes = useStyles();
  return (
    <ChartsLayout>
      <Switch>
        <Route path="/charts">
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.root}>
                <LastEditedHistogram language={language} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.root}>
                <RevisionCountHistogram language={language} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.root}>
                <TextLengthHistogram language={language} />
              </Paper>
            </Grid>
          </Grid>
        </Route>
      </Switch>
    </ChartsLayout>
  );
};
