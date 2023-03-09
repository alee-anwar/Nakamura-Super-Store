import { Grid } from "@mui/material";
import React from "react";
import { titleStyle } from "../pages/Style/titleStyle";

const Customers = () => {
  return (
    <Grid item xs={8} style={titleStyle.title}>
      Customers
    </Grid>
  );
};

export default Customers;
