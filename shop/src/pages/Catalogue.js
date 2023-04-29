import React from "react";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import { Box, Container, Grid } from "@mui/material";
import FilterSidebar from "../components/FilterSidebar";
import PaginatedItems from "../components/PaginatedItems";

const Catalogue = ({ cart, setCart, wishlist, setWishlist }) => {
  return (
    <Container maxWidth="lg" disableGutters sx={{ pt: 5 }}>
      <BreadcrumbsComponent name={"Catalogue"} path={"/catalogue"} />
      <Grid container columns={14} spacing={2} mt={2}>
        <Grid item xs={14} md={3}>
          <FilterSidebar />
        </Grid>
        <Grid item xs={14} md={11}>
          <PaginatedItems
            cart={cart}
            setCart={setCart}
            wishlist={wishlist}
            setWishlist={setWishlist}
            text={"Explore our Catalogue"}
            sx={{ flex: "1 1 auto" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Catalogue;
