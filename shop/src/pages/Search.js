import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import Empty from "../components/Empty";
import ProductCard from "../components/ProductCard";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";

export default function Search({
  cartItems,
  setCartItems,
  setWishlist,
  wishlist,
  setTotalCost,
  totalCost,
}) {
  const location = useLocation();
  console.log(location.state.Data);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/productList/searchProducts?productTitle=${location.state.Data}`
        );
        console.log(response.data.data.searchedForProduct);
        setProducts(response.data.data.searchedForProduct);
        setIsLoading(false);
      } catch (error) {
        console.error("Error searching products:", error);
        setIsLoading(false);
      }
    };

    if (location.state.Data) {
      fetchData();
    }
  }, [location.state.Data]);

  return (
    <Container maxWidth="lg" disableGutters sx={{ py: 5 }}>
      <BreadcrumbsComponent name={"Search"} path={"/search"} />
      <Grid container mt={2}>
        <Grid>
          <Typography variant="h5">
            Searched for "
            {location.state.Data !== undefined && location.state.Data}"
          </Typography>
        </Grid>
        <Grid container>
          {isLoading ? (
            <Empty />
          ) : products && products.length > 0 ? (
            products.map((item) => (
              <Grid item xs={2} sm={4} md={3} mt={2}>
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
          ) : (
            <Empty message="No search results." />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
