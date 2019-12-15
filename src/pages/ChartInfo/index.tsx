import * as React from "react";
import { Grid, Paper } from "@material-ui/core";
import { LanguageContext } from "../../contexts/LanguageContext";

export interface ChartInfoProps {
  chartHeader: React.ReactNode;
  chartComponent: React.ComponentType<{ language: string }>;
}

export const ChartInfo: React.FC<ChartInfoProps> = ({
  chartComponent: Component,
  ...props
}) => {
  const [language, _] = React.useContext(LanguageContext);
  return (
    <Grid>
      <Grid>
        <Paper>
          <h4>{props.chartHeader}</h4>
          <Component language={language} />
        </Paper>
      </Grid>
      <Grid item>{props.children}</Grid>
    </Grid>
  );
};
