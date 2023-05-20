import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Skeleton, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import AddToCartBtn from "./reuseableComponents/AddToCartBtn";
import WishlistBtn from "./reuseableComponents/WishlistBtn";

const ProductCard = (props) => {
  const { wishlist, setWishlist, item, cartItems, setCartItems, setTotalCost } = props;

  // console.log("Welcome to the Product Card")
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
      <WishlistBtn wishlist={wishlist} setWishlist={setWishlist} item={item} />
      <CardContent sx={{ p: 0 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ pb: 2 }}>
          <Typography variant="subtitle">
            {typeof item.price === "number" ? (
              `AFN ${item.price?.toFixed(2)}`
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
