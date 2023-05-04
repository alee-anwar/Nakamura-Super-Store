import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
  Skeleton,
  Box,
  IconButton,
} from "@mui/material";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const WishlistCard = ({
  setWishlist,
  item,
  cartItems,
  setCartItems,
  setTotalCost,
}) => {
  const isItemInCart = cartItems?.some((cartItem) => cartItem._id === item._id);

  const btnText = isItemInCart ? "Remove" : "Add";

  // Remove item from wishlist
  const removeFromWishlist = () => {
    setWishlist((prev) => prev.filter((element) => element._id !== item._id));
  };

  // Add to cart
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
    <Card sx={{ maxWidth: 180, px: 2, mb: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          disableRipple
          onClick={removeFromWishlist}
          aria-label="delete"
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
      <CardMedia
        component="img"
        height="180px"
        image={item.image}
        alt={item.title}
        style={{ objectFit: "fill" }}
      />
      <CardContent sx={{ p: 0 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ py: 2 }}>
          <Typography variant="subtitle">
            {typeof item.price === "number" ? (
              `Rs ${item.price?.toFixed(2)}`
            ) : (
              <Skeleton width={60} height={30} />
            )}
          </Typography>
          <Typography variant="subtitle">
            {item.quantity === "" ? (
              <Skeleton width={60} height={30} />
            ) : (
              item.size
            )}
          </Typography>
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignContent: "flex-start",
            justifyContent: "space-between",
          }}
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
            }}
          >
            {item.productTitle === "" ? (
              <Skeleton width={100} height={30} />
            ) : (
              item.productTitle
            )}
          </Typography>
          <Button
            variant="contained"
            onClick={isItemInCart ? handleRemoveFromCart : handleAddToCart}
            aria-label={isItemInCart ? "Remove from cart" : "Add to cart"}
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
            <Typography
              variant="body2"
              className="add"
              sx={{ fontWeight: 500 }}
            >
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default WishlistCard;
