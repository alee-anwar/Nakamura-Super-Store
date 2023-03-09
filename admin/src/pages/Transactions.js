import { Grid } from "@mui/material";
import React from "react";
import { titleStyle } from "../pages/Style/titleStyle";

const Transactions = () => {
  return (
    <Grid item xs={8} style={titleStyle.title}>
      Transactions
    </Grid>
  );
};

export default Transactions;
