import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  OutlinedInput,
  Skeleton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
// import QuantityChange from "./QuantityChange";

function CartItem({
  item,
  // handleRemoveItem,
  quantity,
  setQuantity,
  availableStock,
  setAvailableStock,
  productQuantities,
  setProductQuantities,
  setTotalCost, // Add setTotalCost to props
  cartItems,
  setCartItems,
}) {
  const { _id, image, productTitle, stock, price } = item;

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item._id !== itemId);

    setCartItems(updatedItems);
    setProductQuantities((prevQuantities) => {
      const { [_id]: _, ...restQuantities } = prevQuantities; // Remove the quantity for the removed item
      return restQuantities;
    });
  };

  const handleQuantityChange = (event) => {
    let value = parseInt(event.target.value);
    value = isNaN(value) ? 1 : value; // Set default value to 1 if value is NaN

    // Adjust the value to be within the valid range
    value = Math.max(1, Math.min(value, stock));

    setQuantity(value);
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [_id]: value,
    }));
  };

  useEffect(() => {
    const selectedQuantity = productQuantities[_id] || 1;
    setTotalCost(
      cartItems.reduce(
        (total, item) =>
          total + item.price * (productQuantities[item._id] || 1),
        0
      )
    );
  }, [productQuantities, cartItems]);

  return (
    <>
      <Grid container>
        <Grid item xs={4} sm={3} md={3} lg={2} p={1}>
          <Link to={`/productdetails/${_id}`}>
            <img src={image} width={100} height={100} alt={productTitle} />
          </Link>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          {/* <Typography variant="subtitle1" fontWeight="bold" pt={1}>
            {productTitle}
          </Typography> */}
          <Link
            to={`/productdetails/${_id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Typography
              lineHeight={1.1}
              noWrap={false}
              variant="body"
              sx={{
                // overflowWrap: "break-word",
                maxHeight: 32,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                pb: 0.6,
                fontWeight: "500",
                pt: 1,
              }}
            >
              {typeof item.productTitle === "string" ? (
                item.productTitle
              ) : (
                <Skeleton width={{ md: "200px", xs: "50px" }} />
              )}
            </Typography>
          </Link>

          <Box pt={3}>
            <Typography variant="subtitle2">Quantity:</Typography>
            {/* <QuantityChange
              item={item}
              setProductQuantities={setProductQuantities}
              setAvailableStock={setAvailableStock}
              productQuantities={productQuantities}
            /> */}
            <OutlinedInput
              type="number"
              value={
                productQuantities[_id] !== undefined
                  ? productQuantities[_id]
                  : 1
              }
              onChange={handleQuantityChange}
              min="1"
              sx={{
                width: "70px",
                height: "25px",
                fontSize: "14px",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={2} sm={3} md={4} lg={4}>
          <Typography variant="subtitle1" fontWeight={500} pt={1}>
            {typeof price === "number" ? (
              `Rs ${price?.toFixed(2)}`
            ) : (
              <Skeleton />
            )}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={1} lg={2}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={() => handleRemoveItem(item._id)}>
              <DeleteIcon color="error.main" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default CartItem;
