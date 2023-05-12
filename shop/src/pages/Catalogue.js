import React from "react";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import { Box, Container, Grid } from "@mui/material";
import FilterSidebar from "../components/FilterSidebar";
import PaginatedItems from "../components/PaginatedItems";
import ProductCard from "../components/ProductCard";

const Catalogue = ({
  cartItems,
  setCartItems,
  totalCost,
  setTotalCost,
  wishlist,
  setWishlist,
}) => {
  // console.log("Catalogue")
  return (
    <Container maxWidth="lg" disableGutters sx={{ pt: 5 }}>
      <BreadcrumbsComponent name={"Catalogue"} path={"/catalogue"} />
      
      <Grid container columns={14} spacing={2} mt={2}>
        <Grid item xs={14} md={3} key="filter-sidebar">
          <FilterSidebar />
        </Grid>
        <Grid item xs={14} md={11}>
          <PaginatedItems
            cartItems={cartItems}
            setCartItems={setCartItems}
            wishlist={wishlist}
            setWishlist={setWishlist}
            totalCost={totalCost}
            setTotalCost={setTotalCost}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Catalogue;
