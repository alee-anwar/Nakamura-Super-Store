import React, { useEffect } from "react";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import { Box, Container, Grid, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";
import ErrorMessage from "../components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";

const Wishlist = ({
  cartItems,
  setCartItems,
  setWishlist,
  wishlist,
  setTotalCost,
  totalCost,
}) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    const savedWishlistItems = JSON.parse(localStorage.getItem("wishlist"));
    if (savedWishlistItems) {
      setWishlist(savedWishlistItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  console.log("Welcome to Wishlist Page");
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <BreadcrumbsComponent name={"Wishlist"} path={"/wishlist"} />
      <Box display="flex" alignItems="center">
        <Typography variant="h1" my={2} flexGrow={1}>
          Wishlist
        </Typography>
        <Link to="#" onClick={handleGoBack} style={{ color: "#ffb800" }}>
          Go Back
        </Link>
      </Box>
      <Grid container>
        {wishlist.length === 0 ? (
          <Grid item xs={12} md={12}>
            <ErrorMessage
              path={"/shop"}
              errorMessage={" Your Wishlist is empty"}
              linkMsg={"Return to shopping"}
            />
          </Grid>
        ) : (
          wishlist.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <ProductCard
                cartItems={cartItems}
                setCartItems={setCartItems}
                wishlist={wishlist}
                setWishlist={setWishlist}
                item={item}
                totalCost={totalCost}
                setTotalCost={setTotalCost}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};
export default Wishlist;
