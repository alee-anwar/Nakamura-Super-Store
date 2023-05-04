import React, { useEffect } from "react";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import { Container, Grid, Typography } from "@mui/material";
import WishlistCard from "../components/WishlistCard";

const Wishlist = ({ setCartItems, setWishlist, wishlist, setTotalCost }) => {

  useEffect(() => {
    const savedWishlistItems = JSON.parse(localStorage.getItem("wishlist"));
    if (savedWishlistItems) {
      setWishlist(savedWishlistItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <BreadcrumbsComponent name={"Wishlist"} path={"/wishlist"} />
      <Typography variant="h1" my={2}>
        Wishlist
      </Typography>

      <Grid container>
        {wishlist.length === 0 ? (
          <Typography variant="subtitle1">Your wishlist is empty.</Typography>
        ) : (
          wishlist.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <WishlistCard
                item={item}
                setCartItems={setCartItems}
                setWishlist={setWishlist}
                wishlist={wishlist}
                setTotalCost={setTotalCost}
                // removeFromWishlist={removeFromWishlist}
                // showRemoveButton={true}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Wishlist;
