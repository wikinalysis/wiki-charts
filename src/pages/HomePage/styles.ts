import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  foreground: {
    backgroundColor: theme.palette.background.paper
  },
  splash: {
    height: "40%",
    maxHeight: "40%"
  },
  splashImage: { height: "100%", width: "100%" }
}));
