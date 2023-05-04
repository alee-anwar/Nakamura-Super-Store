import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Skeleton, Stack } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { Link } from "react-router-dom";
import AddToCartBtn from "./AddToCartBtn";
import WishlistBtn from "./WishlistBtn";

const ProductCard = (props) => {
  const { wishlist, setWishlist, item, cartItems, setCartItems, setTotalCost } =
    props;
  console.log("ProductCard");

  // const isItemInCart = cartItems?.some((cartItem) => cartItem._id === item._id);
  // const isItemInWishlist = wishlist.some(
  //   (wishlistItem) => wishlistItem._id === item._id
  // );

  // const btnText = isItemInCart ? "Remove" : "add";

  // const handleAddToCart = () => {
  //   setCartItems((prevCartItems) => [...prevCartItems, item]);
  //   setTotalCost((prevTotalCost) => prevTotalCost + item.price);
  // };

  // const handleRemoveFromCart = () => {
  //   setCartItems((prevCartItems) =>
  //     prevCartItems.filter((cartItem) => cartItem._id !== item._id)
  //   );
  //   setTotalCost((prevTotalCost) => prevTotalCost - item.price);
  // };

  // const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // const handleToggleWishlist = () => {
  //   const isInWishlist = wishlist.some(
  //     (wishlistItem) => wishlistItem._id === item._id
  //   );
  //   if (isInWishlist) {
  //     setWishlist((prevWishlist) =>
  //       prevWishlist.filter((wishlistItem) => wishlistItem._id !== item._id)
  //     );
  //   } else {
  //     setWishlist((prevWishlist) => [...prevWishlist, item]);
  //   }
  // };

  return (
    <Card sx={{ maxWidth: 180, px: 2, pt: 2 }}>
      <Link to={`/productdetails/${item._id}`}>
        <CardMedia
          component="img"
          height="180px"
          alt={item.productTitle}
          image={item.image}
          style={{ objectFit: "fill" }}
        />
      </Link>
      <WishlistBtn wishlist={wishlist} setWishlist={setWishlist} item={item}/>
      {/* <Box display="flex" justifyContent="flex-end">
        <Checkbox
          className="wishlist--icon"
          icon={<FavoriteBorderRoundedIcon color="primary" />}
          checkedIcon={<FavoriteRoundedIcon color="primary" />}
          checked={isItemInWishlist}
          onChange={handleToggleWishlist}
        />
      </Box> */}
      <CardContent sx={{ p: 0 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ pb: 2 }}>
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
            {typeof item.productTitle === "string" ? (
              item.productTitle
            ) : (
              <Skeleton width={100} height={30} />
            )}
          </Typography>
          <AddToCartBtn
            cartItems={cartItems}
            setCartItems={setCartItems}
            setTotalCost={setTotalCost}
            item={item}
            isFullWidth={false}
          />
          {/* <Button
            variant="contained"
            // onClick={() => addToCart(item)}
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
          </Button> */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
