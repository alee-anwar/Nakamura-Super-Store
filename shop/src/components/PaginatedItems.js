import React, { useEffect, useState } from "react";
import { Grid, Pagination } from "@mui/material";
import ProductCard from "./ProductCard";
import axios from "axios";

function PaginatedItems({
  cartItems,
  setCartItems,
  wishlist,
  setWishlist,
  totalCost,
  setTotalCost,
  filteredProducts, // Update the products prop
}) {
  const [products, setProducts] = useState(filteredProducts);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const PRODUCTS_PER_PAGE = 12; // Number of products to display per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:3000/productList/viewProducts"
        );
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(products.length / PRODUCTS_PER_PAGE));
  }, [products]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
  const endIndex = page * PRODUCTS_PER_PAGE;

  const displayedProducts = products.slice(startIndex, endIndex);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Grid container columns={12} spacing={1}>
        {displayedProducts.map((item) => (
          <Grid item xs={6} sm={4} md={4} lg={3} key={item._id}>
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
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: "flex", justifyContent: "center", my: 2 }}
      />
    </div>
  );
}

export default PaginatedItems;

{
  /* <PaginatedItems
            cartItems={cartItems}
            setCartItems={setCartItems}
            wishlist={wishlist}
            setWishlist={setWishlist}
            totalCost={totalCost}
            setTotalCost={setTotalCost}
            filteredProducts={filteredProducts} // Pass the filtered products to PaginatedItems component
          /> */
}
