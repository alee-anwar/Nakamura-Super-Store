import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  banner: {
    width: "100%",
    height: 200,
    backgroundColor: "#e8e8e8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
}));

const NameBanner = ({ categories }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.banner}>
        <Typography variant="h4" component="h2">
          ناکامورا ستر پلورنځۍ
        </Typography>
      </div>
    </div>
  );
};

export default NameBanner;
