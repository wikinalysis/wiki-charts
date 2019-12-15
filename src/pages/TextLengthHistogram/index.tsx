import * as React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { TextLengthHistogram as Chart } from "../../charts/TextLengthHistogram";
import { LanguageContext } from "../../contexts/LanguageContext";

export const TextLengthHistogram: React.FC = props => {
  const [language, _] = React.useContext(LanguageContext);
  return (
    <Grid container>
      <Grid item sm={12} md={6}>
        <Paper style={{ minWidth: 500 }}>
          <h4 style={{ textAlign: "center" }}>Article Length</h4>
          <Chart language={language} />
        </Paper>
      </Grid>
      <Grid item md={6}>
        <Paper>
          <Typography>What is this?</Typography>
          <Typography paragraph>
            This chart represents the distribution of article lengths through
            the [LANGUAGE] Wikipedia. The further to the left the bulk of the
            data is, the shorter articles tend to be.
          </Typography>
          <Typography paragraph>
            Intuitively, we'd expect Wiki's to have a large number of short
            articles. Small entries on towns and cities, stubs, and other small
            articles will tend to outnumber the articles we often think of. This
            is what we see in most of the data currently available.
          </Typography>
          <Typography paragraph>
            I would also expect a second concentration of longer articles that
            represent long, more detailed pages. This would be a much wider
            distribution, as quality articles may vary widely. However, I would
            still expect it to be distinct from the first distribution of stubs
            and shorter snippets.
          </Typography>
          <Typography paragraph>
            At the moment, all the data loaded here is for the tiniest Wikis
            available. There are an overwhelming number of very small articles,
            and almost no large ones.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
