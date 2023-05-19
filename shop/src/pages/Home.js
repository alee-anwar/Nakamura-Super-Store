import React from "react";
import Banner from "../components/Banner";
import FeaturedItemsComponent from "../components/FeaturedItems";
import { Box, Container } from "@mui/material";
import ShopByCategories from "../components/ShopByCategories";
import FreshItems from "../components/FreshItems";
import ShowCase from "../components/ShowCase";
import NameBanner from "../components/NameBanner";

const Home = ({
  cartItems,
  setCartItems,
  wishlist,
  setWishlist,
  setTotalCost,
  handleCategoryClick
}) => {
  return (
    <>
      <Banner />
      <Container maxWidth="lg">
        <ShopByCategories handleCategoryClick={handleCategoryClick}/>
        <Box py={4}>
          <NameBanner />
        </Box>
        <ShowCase />
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
