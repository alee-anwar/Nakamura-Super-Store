import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
const ProductCard = (props) => {
  const { image, price, qty, title, setWishlist, item, setCart } = props;
  const [inCart, setInCart] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddToCartClick = () => {
    // Add the product to the cart
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  function wishlistIcon() {
    return (
      <div>
        <Checkbox
          onClick={(e) => handleWishlistClick(e)}
          className="wishlist--icon"
          {...label}
          icon={<FavoriteBorderRoundedIcon color="primary"/>}
          checkedIcon={<FavoriteRoundedIcon />}
          disableRipple
          sx={{
            display: 'flex',
            justifyContent: 'flex-end' 
            // "&.Mui-checked": {
            //   color: "green",
            // },
          }}
        />
      </div>
    );
  }

  const handleWishlistClick = (e) => {
    if (e.target.checked) {
      setWishlist(prev => [...prev, prev.id === item.id ? null : item])
    } else {
      setWishlist(prev => prev.filter(element => element.id !== item.id))
    }
  }

  const addToCart = () => {
    setCart(prev => {
      // check if item is already in cart
      if (prev.includes(item)) {
        return prev;
      } else {
        return [...prev, item]
      }
    });
    setInCart(() => !inCart);
  }

  const removeFromCart = () => {
    setCart(prev => prev.filter(element => element.id !== item.id));
    setInCart(() => !inCart);
  }

  return (
    <Card sx={{ maxWidth: 216, p: 2 }}>
     
      <CardMedia
        sx={{ py: 1 }}
        component="img"
        height="auto"
        alt={title}
        image={image}
        p={15}
      />
       <Box> {wishlistIcon() }</Box>
      <CardContent sx={{ p: 0 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ py: 2 }}>
          <Typography variant="subtitle">
            {typeof price === "number" ? `Rs ${price.toFixed(2)}` : "NAN"}
          </Typography>
          <Typography variant="subtitle">{qty}</Typography>
        </Stack>
        <Box display="flex" sx={{ alignContent: "flex-start" }}>
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
            {title}
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
            <Box className="add" sx={{fontWeight: 500}}>Add</Box>
            <ShoppingCartCheckoutRoundedIcon
              className="cart"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0,
                transition: "opacity 0.9s ease-in-out",
              }}
            />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
