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

const ProductCard = (props) => {
  // const imageurl = 'https://spoonacular.com/productImages/214795-312x231.jpeg'
  const { setWishlist, item, setCart } = props;

  const [inCart, setInCart] = useState(true);
  const [inWishlist, setInWishlist] = useState(false);

  const [quantity, setQuantity] = useState(1);

  // const handleQuantityChange = (event) => {
  //   setQuantity(parseInt(event.target.value));
  // };

  // const handleAddToCartClick = () => {
  //   // Add the product to the cart
  // };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  function wishlistIcon() {
    return (
      <div>
        <Checkbox
          onClick={(e) => handleWishlistClick(e)}
          className="wishlist--icon"
          {...label}
          icon={<FavoriteBorderRoundedIcon color="primary" />}
          checkedIcon={<FavoriteRoundedIcon />}
          // checked={inWishlist}
          disableRipple
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        />
      </div>
    );
  }

  //  ============= Remove from wishlist  ==================
  const handleWishlistClick = (e) => {
    if (e.target.checked) {
      setWishlist((prev) => [...prev, prev.id === item._id ? null : item]);
    } else {
      setWishlist((prev) => prev.filter((element) => element._id !== item._id));
    }
  };

  // const handleWishlistClick = (e) => {
  //   const checked = e.target.checked;

  //   if (checked) {
  //     setWishlist((prev) => [...prev, item]);
  //   } else {
  //     setWishlist((prev) => prev.filter((element) => element._id !== item._id));
  //   }

  //   setInWishlist(checked);
  // };

  const addToCart = () => {
    setCart((prev) => {
      // check if item is already in cart
      if (prev.includes(item)) {
        return prev;
      } else {
        return [...prev, item];
      }
    });
    setInCart(() => !inCart);
  };

  const removeFromCart = () => {
    setCart((prev) => prev.filter((element) => element._id !== item._id));
    setInCart(() => !inCart);
  };

  return (
    <Card sx={{ maxWidth: 200, p: 2 }}>
      <CardMedia
        sx={{ py: 1 }}
        component="img"
        height="auto"
        alt={item.productTitle}
        image={item.image}
        p={15}
      />
      <Box> {wishlistIcon()}</Box>
      <CardContent sx={{ p: 0 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ py: 2 }}>
          <Typography variant="subtitle">
            {typeof item.price === "number"
              ? `Rs ${item.price.toFixed(2)}`
              : <Skeleton width={60} height={30} />}
          </Typography>
          <Typography variant="subtitle">
            {item.quantity === "" ? <Skeleton width={60} height={30} /> : item.quantity }
          </Typography>
        </Stack>
        <Box  sx={{ display:"flex", alignContent: "flex-start", justifyContent: "space-between" }}>
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
            {item.productTitle === "" ? <Skeleton width={100} height={30} /> : item.productTitle}
          </Typography>
          <Button
            variant="contained"
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
            <Box className="add" sx={{ fontWeight: 500 }}>
              Add
            </Box>
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

export default ProductCard;
