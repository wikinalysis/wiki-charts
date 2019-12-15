import * as React from "react";
import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core";
import { useStyles } from "./styles";
import SplashImage from "./splash.jpg";
import SplashSection from "./Splash";

export const HomePage: React.FC = ({ children }) => {
  const classes = useStyles();
  return <SplashSection />;
};
