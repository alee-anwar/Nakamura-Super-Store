import React from "react";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import WishlistSection from "../components/WishlistSection";
import { Container } from "@mui/material";

const Wishlist = ({ setCart, setWishlist, wishlist }) => {
  return (
    <Container sx={{ pt: 5 }}>
      <BreadcrumbsComponent name={"Wishlist"} path={"/wishlist"} />
      <WishlistSection
        setCart={setCart}
        wishlist={wishlist}
        setWishlist={setWishlist}
      />
    </Container>
  );
};

export default Wishlist;
