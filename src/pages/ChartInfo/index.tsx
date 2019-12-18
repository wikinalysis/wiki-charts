import * as React from "react";
import { Grid } from "@material-ui/core";
import { Paper } from "../../components/Paper";
import { LanguageContext } from "../../contexts/LanguageContext";

export interface ChartInfoProps {
  chartHeader: React.ReactNode;
  chartComponent: React.ComponentType<{ language: string }>;
}

// Minor MUI
export const ChartInfo: React.FC<ChartInfoProps> = ({
  chartComponent: Component,
  ...props
}) => {
  const [language, _] = React.useContext(LanguageContext);
  return (
    <Grid container>
      <Grid item>
        <Paper>
          <Component language={language} />
        </Paper>
      </Grid>
      <Grid item>{props.children}</Grid>
    </Grid>
  );
};
