import * as React from "react";
import { Grid } from "@material-ui/core";
import { TypographyProps, Typography } from "../../components/Typography";

export type TextTable = { props: TypographyProps; text: React.ReactNode }[][];

export const HOME_TEXT: TextTable = [
  [
    { props: { variant: "h4" }, text: "What is this?" },
    {
      props: { paragraph: true },
      text: (
        <>
          Welcome to Wikipedia Analysis! We take raw data provided for free by
          Wikipedia, and crunch the numbers to display that data in interesting
          ways. We only have a few basic charts right now, but we're always
          tinkering with ways to show data in new ways, and show it dynamically
          enough that users can see exactly what they're interested in.
        </>
      )
    },
    {
      props: { paragraph: true },
      text: (
        <>
          For now, our goal is just to be interesting. Eventually, we hope that
          our data can help Wikipedia directly. They have a lot of data to
          manage, and few resources. Maybe analytics can help them achieve their
          goals.
        </>
      )
    },
    {
      props: { paragraph: true },
      text: (
        <>
          Long term, our goal is to work through the languages with larger and
          larger encyclopedias, until we eventually reach English. Our other
          goal is instead of analyzing statistics about Wikipedia, to analyze
          the text of the articles directly. For now, we're going one step at a
          time. We'll get there.
        </>
      )
    }
  ],
  [
    { props: { variant: "h4" }, text: "Who are you?" },
    {
      props: { paragraph: true },
      text: (
        <>
          I'm just a software developer working out of my study. This whole
          thing started as a hackathon idea I had for my company's team. The
          team ended up doing something else, but I never quite forgot about
          this project.
        </>
      )
    },
    {
      props: { paragraph: true },
      text: (
        <>
          A few months later when I was looking for a big side project that
          would involve multiple technologies, and would take more than a week
          to build, I revisited this plan. Four months later, and here we are.
          Turns out I didn't need a team, just a willingness to learn and a lot
          more time.
        </>
      )
    },
    {
      props: { paragraph: true },
      text: (
        <>
          This page is built using a combination of Apache BEAM (a data
          processing platform originally developed by Google), the Phoenix
          Framework (a highly scalable web framework based on Elixir), ReactJS
          (a frontend framework developed by Facebook), and d3js (the gold
          standard for web visualizations). It uses Scala, Elixir, and
          Typescript. The whole application is hosted on Google Cloud Platform
          for about $10 a month.
        </>
      )
    }
  ]
];

export const TextContent: React.FC<{ text: TextTable }> = props => {
  return (
    <>
      {props.text.map((row, i) => (
        <Grid key={i} item md={6}>
          {row.map((text, i) => (
            <Typography key={i} {...text.props}>
              {text.text}
            </Typography>
          ))}
        </Grid>
      ))}
    </>
  );
};
