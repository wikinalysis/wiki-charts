import * as React from "react";
import { Paper } from "../../components/Paper";
import { TextLengthHistogram as Chart } from "../../charts/TextLengthHistogram";
import { Typography } from "../../components/Typography";
import { ChartInfo } from "../ChartInfo";

export const TextLengthHistogram: React.FC = props => {
  return (
    <ChartInfo chartHeader="Article Length" chartComponent={Chart}>
      <Paper>
        <Typography>What is this?</Typography>
        <Typography paragraph>
          This chart represents the distribution of article lengths through the
          [LANGUAGE] Wikipedia. The further to the left the bulk of the data is,
          the shorter articles tend to be.
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
    </ChartInfo>
  );
};
