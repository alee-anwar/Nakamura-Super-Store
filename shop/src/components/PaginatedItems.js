import React, { useEffect, useMemo, useState } from "react";
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
}) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const PRODUCTS_PER_PAGE = 8; // Number of products to display per page

  const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:3000/productList/viewProducts",
          {
            // params: { page },
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      console.log(response);
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    setTotalPages(Math.ceil(products.length / PRODUCTS_PER_PAGE));
  }, [products, setTotalPages]);

  const displayedProducts = useMemo(() => {
    return products.slice(startIndex, endIndex);
  }, [products, startIndex, endIndex]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handlePageChange = (event, value) => {
    // const pageNumber = parseInt(event.target.textContent);
    // setPage(pageNumber);
    setPage(value);
  };

  // console.log({ products });

  return (
    <div>
      <Grid container columns={12} spacing={1}>
        {products.map((item) => (
          <Grid item xs={6} sm={4} md={4} lg={3} key={item._id}>
            <ProductCard
              cartItems={cartItems}
              setCartItems={setCartItems}
              wishlist={wishlist}
              setWishlist={setWishlist}
              item={item}
              totalCost={totalCost}
              setTotalCost={setTotalCost}
              startIndex={startIndex}
              endIndex={endIndex}
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
