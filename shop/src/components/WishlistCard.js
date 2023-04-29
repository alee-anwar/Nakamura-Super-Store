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
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const WishlistCard = ({ setCart, setWishlist, wishlist, item }) => {
  const [inCart, setInCart] = useState(false);

  // Remove item from wishlist
  const removeFromWishlist = () => {
    setWishlist((prev) => prev.filter((element) => element.id !== item.id));
  };

  // Add to cart
  const addToCart = () => {
    setCart((prev) => {
      if (prev.includes(item)) {
        return prev;
      } else {
        return [...prev, item];
      }
    });
    setInCart((prev) => !prev);
  };

  return (
    <Card sx={{ maxWidth: 200 }}>
      <Box  sx={{display: 'flex', justifyContent: 'flex-end'}}>
      <IconButton disableRipple onClick={removeFromWishlist} aria-label="delete">
        <CloseRoundedIcon fontSize='small' color="error"/>
      </IconButton>
      </Box>
      <CardMedia
        component="img"
        height="auto"
        image={item.image}
        alt={item.title}
      />
      <CardContent>
        <Stack direction="row" justifyContent="space-between" sx={{ py: 2 }}>
          <Typography variant="subtitle">
            {typeof item.price === "number" ? (
              `Rs ${item.price.toFixed(2)}`
            ) : (
              <Skeleton width={60} height={30} />
            )}
          </Typography>
          <Typography variant="subtitle">
            {item.quantity === "string" ? (
              item.quantity
            ) : (
              <Skeleton width={60} height={30} />
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
            {item.productTitle === "string" ? (
              item.productTitle
            ) : (
              <Skeleton width={100} height={30} />
            )}
          </Typography>
          <Button
            variant="contained"
            onClick={addToCart}
            color={inCart ? "success" : "primary"}
            disabled={inCart}
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
        {/* {inCart ? "Added to Cart" : "Add to Cart"} */}
      </CardContent>
    </Card>
  );
};

export default WishlistCard;
