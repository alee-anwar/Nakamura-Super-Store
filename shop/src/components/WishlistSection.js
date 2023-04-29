import React from "react";
import WishlistCard from "./WishlistCard";
import { Container, Grid, Typography } from "@mui/material";

const WishlistSection = ({ wishlist, setWishlist, setCart }) => {
  // Remove item from wishlist
  // const removeFromWishlist = (item) => {
  //   setWishlist((prev) => prev.filter((element) => element.id !== item.id));
  // };

  return (
    <>
      <Typography variant="h1" my={2}>Wishlist</Typography>
      <Grid container>
        {wishlist.length === 0 ? (
          <Typography variant="subtitle1">Your wishlist is empty.</Typography>
        ) : (
          wishlist.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <WishlistCard
                item={item}
                setCart={setCart}
                setWishlist={setWishlist}
                wishlist={wishlist}
                // removeFromWishlist={removeFromWishlist}
                showRemoveButton={true}
              />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default WishlistSection;
