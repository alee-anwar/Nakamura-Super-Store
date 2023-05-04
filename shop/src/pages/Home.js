import React from "react";
import Banner from "../components/Banner";
import FeaturedItemsComponent from "../components/FeaturedItems";
import { Container } from "@mui/material";
import ShopByCategories from "../components/ShopByCategories";
import FreshItems from "../components/FreshItems";

const Home = ({
  cartItems,
  setCartItems,
  wishlist,
  setWishlist,
  setTotalCost,
}) => {
  return (
    <>
      <Banner />
      <Container maxWidth="lg">
        <ShopByCategories />
        <FeaturedItemsComponent
          cartItems={cartItems}
          setCartItems={setCartItems}
          wishlist={wishlist}
          setWishlist={setWishlist}
          setTotalCost={setTotalCost}
        />
        <FreshItems
          cartItems={cartItems}
          setCartItems={setCartItems}
          wishlist={wishlist}
          setWishlist={setWishlist}
          setTotalCost={setTotalCost}
        />
      </Container>
    </>
  );
};

export default Home;
