import { Button, Typography } from "@mui/material";
import React from "react";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";

const AddToCartBtn = ({
  cartItems,
  setCartItems,
  setTotalCost,
  item,
  isFullWidth,
  disabled
}) => {
  const isItemInCart = cartItems?.some((cartItem) => cartItem._id === item._id);
  const btnText = isItemInCart ? "Remove" : "Add";

  const handleAddToCart = () => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
    setTotalCost((prevTotalCost) => prevTotalCost + item.price);
  };

  const handleRemoveFromCart = () => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((cartItem) => cartItem._id !== item._id)
    );
    setTotalCost((prevTotalCost) => prevTotalCost - item.price);
  };

  return (
    <Button
      variant="contained"
      fullWidth={isFullWidth}
      // onClick={() => addToCart(item)}
      onClick={isItemInCart ? handleRemoveFromCart : handleAddToCart}
      aria-label={isItemInCart ? "Remove from cart" : "Add to cart"}
      disabled={disabled}
      ml={1}
      sx={{
        height: 32,
        "&:hover::before": {
          opacity: 1,
        },
        "&:hover": {
          backgroundColor: "#ffe033",
          "& .add": {
            opacity: 0,
          },
          "& .cart": {
            opacity: 1,
          },
        },
      }}
    >
      <Typography variant="body2" className="add" sx={{ fontWeight: 500 }}>
        {btnText}
      </Typography>
      <ShoppingCartCheckoutRoundedIcon
        className="cart"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          transition: "opacity 0.2s ease-in-out",
        }}
      />
    </Button>
  );
};

export default AddToCartBtn;
