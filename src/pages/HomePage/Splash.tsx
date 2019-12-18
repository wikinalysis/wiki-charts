import React from "react";
// import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "../../components/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import SplashImage from "./splash.jpg";
// @ts-ignore
import { useHistory } from "react-router-dom";

// Major MUI
const useStyles = makeStyles(theme => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    backgroundImage: `url(${SplashImage})`,
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    height: "60vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  text: {
    textAlign: "left"
  },
  textLink: {
    textDecoration: "underline",
    cursor: "pointer"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  }
}));

const SplashSection = (props: {}) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Paper className={classes.mainFeaturedPost}>
      {/* Increase the priority of the hero background image */}
      {
        <img
          style={{ display: "none" }}
          src={SplashImage}
          alt={"Credit to Taylor Vick from Unsplash"}
        />
      }
      <div className={classes.overlay} />
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.mainFeaturedPostContent}>
            <div>
              <Typography
                component="h1"
                variant="h2"
                color="inherit"
                className={classes.text}
                gutterBottom
              >
                <strong>Wiki</strong>pedia A<strong>nalysis</strong>
              </Typography>
              <Typography
                variant="h3"
                color="inherit"
                paragraph
                className={classes.text}
              >
                Extracting data from Wikipedia to make charts
              </Typography>
              <Typography
                variant="h4"
                onClick={() => history.push("/charts")}
                className={classes.textLink}
              >
                See the Charts
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SplashSection;
