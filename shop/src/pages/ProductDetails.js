import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Box, Container, OutlinedInput, Paper, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddToCartBtn from "../components/reuseableComponents/AddToCartBtn";
import WishlistBtn from "../components/reuseableComponents/WishlistBtn";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import ReviewForm from "../components/ReviewForm";
import Loading from "../components/Loading";
// import { CopyToClipboard } from "react-copy-to-clipboard";

const ProductDetails = ({
  setCartItems,
  cartItems,
  setTotalCost,
  wishlist,
  setWishlist,
  setQuantity,
  availableStock,
  setAvailableStock,
  productQuantities,
  setProductQuantities,
}) => {
  const [product, setProduct] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/productList/product-description/${params.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.productdescription) {
          setProduct(response.data.productdescription);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [params.id]);

  // useEffect(() => {
  //   console.log("availableStock: " + availableStock);
  // }, [product, availableStock]);

  const handleQuantityChange = (event) => {
    let value = parseInt(event.target.value);
    value = isNaN(value) ? 1 : value; // Set default value to 1 if value is NaN

    // Adjust the value to be within the valid range
    value = Math.max(1, Math.min(value, product.stock || 0));

    setQuantity(value);

    const updatedQuantities = {
      ...productQuantities,
      [product?._id]: value,
    };

    setProductQuantities(updatedQuantities);
  };

  useEffect(() => {
    const selectedQuantity = productQuantities[product?._id] || 0;
    const availableStock = product?.stock - selectedQuantity;
    setAvailableStock(availableStock);
  }, [productQuantities, product]);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert(`Link copied! ${window.location.href}`);
      })
      .catch((error) => {
        console.error("Error copying link:", error);
      });
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 5 }}>
      <BreadcrumbsComponent name={"Product"} path={"/productdetails"} />

      {!product ? (
        <Loading />
      ) : (
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} sm={7} md={7}>
            <Box px={{ md: 8 }}>
              <img
                src={product.image}
                alt={product.title}
                width="100%"
                height="auto"
              />
            </Box>
          </Grid>

          {/* Product details */}
          <Grid item xs={12} sm={5} md={5} mb={5}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="body1" fontWeight={600} gutterBottom>
                {product.productTitle}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Rs {product.price}
              </Typography>

              {/* Quantity selection */}
              <Grid container alignItems="center" pt={15} spacing={1}>
                <Grid item>
                  <Typography variant="subtitle1">Quantity:</Typography>
                </Grid>
                <Grid item>
                  <OutlinedInput
                    type="number"
                    value={productQuantities[product?._id] || 1}
                    onChange={handleQuantityChange}
                    min="1"
                    max={product?.stock} // Set the max attribute to the stock of the product
                    sx={{
                      width: "70px",
                      height: "25px",
                      fontSize: "14px",
                    }}
                  />
                </Grid>
              </Grid>

              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ pt: 2 }}
              >
                {availableStock <= 0
                  ? "Out of Stock"
                  : availableStock === product.stock
                  ? availableStock - 1 + " left in stock"
                  : availableStock + " left in stock"}
              </Typography>

              {/* Add to cart button */}
              <Grid container my={5} display="flex" alignItems="center">
                <Grid item sm={10} md={10}>
                  <AddToCartBtn
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    setTotalCost={setTotalCost}
                    item={product}
                    isFullWidth={true}
                    disabled={availableStock <= 0}
                  />
                </Grid>

                {/* Whishlist button */}
                <Grid item sm={2} md={2}>
                  <WishlistBtn
                    wishlist={wishlist}
                    setWishlist={setWishlist}
                    item={product}
                  />
                </Grid>
              </Grid>

              {/* Accordion */}
              <ReviewForm
                description={product.description}
                productId={product._id}
                productTitle={product.productTitle}
              />

              <Grid item xs={6} display="flex" pt={2} alignItems="center">
                <Typography variant="subtitle1" gutterBottom>
                  Share:
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  fontSize="small"
                  pl={1}
                  color="text.secondary"
                >
                  <Tooltip title="Copy Link">
                    <ShareIcon fontSize="small" onClick={handleCopyLink} />
                  </Tooltip>
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ProductDetails;
