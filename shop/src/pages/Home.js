import React from "react";
import Banner from "../components/Banner";
import FeaturedItemsComponent from "../components/FeaturedItems";
import { Container } from "@mui/material";
import ShopByCategories from "../components/ShopByCategories";
import FreshItems from "../components/FreshItems";

const Home = ({ cart, setCart, wishlist, setWishlist }) => {
  return (
    <>
      <Banner />
      <Container maxWidth= 'lg'>
        <ShopByCategories />
        <FeaturedItemsComponent
          cart={cart}
          setCart={setCart}
          wishlist={wishlist}
          setWishlist={setWishlist}
        />
         <FreshItems
          setCart={setCart}
          setWishlist={setWishlist}
        />
      </Container>
    </>
  );
};

export default Home;
