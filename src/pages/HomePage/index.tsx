import * as React from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Grid
} from "@material-ui/core";
import { useStyles } from "./styles";
import SplashImage from "./splash.jpg";
import SplashSection from "./Splash";

export const HomePage: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <SplashSection />;
      <Container>
        <Grid container>
          <Grid item xl={12}>
            <Typography variant="h4">What's this?</Typography>
            <Typography paragraph>
              Welcome to the niche world of Wikipedia Analysis. Wikipedia is a
              massive platform with a purely volunteer group of editors, fact
              checkers, and moderators. We're going to see if we can help them
              out.
            </Typography>
            <Typography paragraph>
              Our only goal is to crunch the vast amounts of data Wikipedia
              generates, visualize that data, and use the visualizations to make
              Wikipedia better.
            </Typography>
            <Typography paragraph>
              While Wikipedia is a common target for people playing with data
              science and big data tools, and some analytics exist, we're
              different. Our visualizations are a little more basic (for now),
              but our focus on scalability means we can create a lot more
              visualizations, for more languages, faster and on demand.
            </Typography>
          </Grid>
          <Grid item xl={12}>
            <Typography variant="h4">What can you do?</Typography>
            <Typography paragraph>
              We're in the early stages of development, but we've already
              calculated the distribution of article lengths throughout
              Wikipedia, and can find which articles are most edited. We can
              also identify articles that haven't been edited recently.
            </Typography>
            <Typography paragraph>
              Our data is heavily biased at the moment towards the smallest
              Wikis, with no encyclopedia analyzed so far having more than 1000
              pages. But we're scaling up rapidly. Our first milestone will be
              the Scottish Wikipedia, and our <em>real</em> milestone will by
              the Hungarian Wikipedia.
            </Typography>
            <Typography paragraph>
              Of course the goal is to have all of them, including English.
              Working our way up slowly lets us identify problems while they're
              still managable.
            </Typography>
          </Grid>
          <Grid item xl={12}>
            <Typography variant="h4">Why?</Typography>
            <Typography paragraph>
              Because we can, and because it's a learning experience. The only
              thing that's really similiar to this is WikiStats. WikiStats has a
              whole team of contributors associated with Wikipedia itself. We're
              actually not a "we" at all, there's just one guy at a desk.
            </Typography>
            <Typography paragraph>
              However, this has been the most challenging computer project of my
              life. I've worked with Google Cloud Platform, 3 different
              programming languages, and software architecture significantly
              more complicated than anything you can find a quick tutorial for
              on Medium.{" "}
            </Typography>
            <Typography paragraph>
              I've run into brick walls, I've cut corners to get to MVP faster,
              I've scaled back scope. This is not small learning project
              anymore, this is a real product now and I never could have guessed
              it would come this far.
            </Typography>
            <Typography paragraph>
              I'm not done yet! Once this is <em>significantly</em> more
              polished, I'm going to start working on the Holy Grail of
              Wikipedia big data crunching. Text analysis. This means parsing
              out and analysing every single word across every single article of
              the biggest encyclopedia to ever exist. I'm excited!
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
