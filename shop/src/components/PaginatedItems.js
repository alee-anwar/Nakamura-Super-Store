import React, { useEffect, useState } from "react";
import { Grid, Pagination } from "@mui/material";
import ProductCard from "./reuseableComponents/ProductCard";
import axios from "axios";

const Vegetables = [
  {
    id: 214795,
    title: "Ortega Salsa, Garden Vegetable Mild",
    price: 1000,
    qty: "250g",
    image: "https://spoonacular.com/productImages/214795-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    id: 72727,
    title: "Birds Eye C&amp;W Ultimate Southwest Blend, Frozen Vegetables",
    price: 1000,
    qty: "250g",
    image: "https://spoonacular.com/productImages/72727-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    id: 98162,
    title: "Birds Eye Mixed Vegetables, 16 oz",
    price: 1000,
    qty: "250g",
    image: "https://spoonacular.com/productImages/98162-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    id: 13333,
    title: "Del Monte Mixed Vegetables, 8.25 oz",
    price: 1000,
    qty: "250g",
    image: "https://spoonacular.com/productImages/13333-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    id: 76119,
    title: "Del Monte Mixed Vegetables With Potatoes, 29 Oz",
    image: "https://spoonacular.com/productImages/76119-312x231.jpeg",
    imageType: "jpeg",
    price: 1000,
    qty: "250g",
  },
  {
    id: 197185,
    title: "Birds Eye Mixed Vegetables, Frozen Vegetables, 80 Oz",
    image: "https://spoonacular.com/productImages/197185-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    id: 72254,
    price: 100,
    qty: "250g",
    title: "Goya Goya  Mixed Vegetables, 16 oz",
    image: "https://spoonacular.com/productImages/72254-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    id: 195908,
    title: "Herdez Mixed Vegetables. Bag",
    price: 100,
    qty: "250g",
    image: "https://spoonacular.com/productImages/195908-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    id: 215251,
    title: "Pictsweet Farms® Mixed Vegetables 28 oz. Bag",
    image: "https://spoonacular.com/productImages/215251-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    id: 46201,
    title: "Veg-All Original Mixed Vegetables, Canned Vegetables, 15 oz",
    image: "https://spoonacular.com/productImages/46201-312x231.png",
    imageType: "png",
  },
  {
    id: 194571,
    title: "Veg-All Original Mixed Vegetables, Canned Vegetables, 29 oz",
    image: "https://spoonacular.com/productImages/194571-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    id: 1099667,
    title: "Marketside Vegetable Medley, 12 oz",
    image: "https://spoonacular.com/productImages/1099667-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    id: 144438,
    title: "Birds Eye Pepper Stir Fry Vegetables, Frozen Vegetables, 14 Oz",
    image: "https://spoonacular.com/productImages/144438-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    id: 639565,
    title: "(6 Pack) Great Value Mixed Vegetables, 15 Oz",
    image: "https://spoonacular.com/productImages/639565-312x231.jpeg",
    imageType: "jpeg",
    price: 1000,
    qty: "250g",
  },
];

function PaginatedItems({ text, cart, setCart, wishlist, setWishlist }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);

  const PRODUCTS_PER_PAGE = 8; // Number of products to display per page

  // useEffect(() => {
  //   // Fetch products from API endpoint
  //   const fetchProducts = async () => {
  //     const response = await fetch(
  //       `http://localhost:3000/client-product-listing/shop-by-categories`
  //     );
  //     const data = await response.json();
  //     setProducts(data.products);
  //     setTotalPages(data.totalPages);
  //   };
  //   fetchProducts();
  // }, [page]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/productList/viewProducts", {
        params: { page },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => setProducts(res.data))
      .then((res) => setTotalPages(res.data.totalPages))
      .catch((err) => console.log(err.message));
  }, [page]);

  // useEffect(() => {
  //   // Fetch products from API endpoint
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get(
  //         'http://localhost:3000/productList/viewProducts',
  //         {
  //         //   params: { page },
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       setProducts(response.data.products);
  //       setTotalPages(response.data.totalPages);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchProducts();
  // }, [page]);

  useEffect(() => {
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const displayedProducts = products.slice(startIndex, endIndex);
    setProducts(displayedProducts);
    setTotalPages(Math.ceil(products.length / PRODUCTS_PER_PAGE));
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  console.log({ products });

  return (
    <div>
      <Grid container columns={12} spacing={1}>
        {products.map((item) => (
          <Grid item xs={6} sm={4} md={4} lg={3} key={item._id}>
            <ProductCard
              cart={cart}
              setCart={setCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
              item={item}
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
