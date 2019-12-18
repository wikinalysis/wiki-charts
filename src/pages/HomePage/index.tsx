import * as React from "react";
import { Container, Grid } from "@material-ui/core";
import SplashSection from "./Splash";
import { TextContent, HOME_TEXT } from "./TextContent";

// Minor MUI
export const HomePage: React.FC = () => {
  return (
    <>
      <SplashSection />;
      <Container>
        <Grid container spacing={3}>
          <TextContent text={HOME_TEXT} />
        </Grid>
      </Container>
    </>
  );
};
