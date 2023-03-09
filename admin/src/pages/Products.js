import { Button, Grid } from "@mui/material";
import React from "react";
import { titleStyle } from "../pages/Style/titleStyle";
const Products = () => {
  return (
    <Grid item xs={8} style={titleStyle.title}>
      Products
      <Button variant="contained">+ Create New</Button>
    </Grid>
  );
};

export default Products;
