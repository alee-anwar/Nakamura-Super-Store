import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import { ArrowLeft, ArrowRight } from "./reuseableComponents/Arrow";
import { Box, Button, Typography } from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import "./custom.css";
const Vegetables = [
  {
    _id: 214795,
    title: "Ortega Salsa, Garden Vegetable Mild",
    price: "1000",
    qty: "250g",
    image: "https://spoonacular.com/productImages/214795-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    _id: 72727,
    title: "Birds Eye C&amp;W Ultimate Southwest Blend, Frozen Vegetables",
    price: 1000,
    qty: "250g",
    image: "https://spoonacular.com/productImages/72727-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    _id: 98162,
    title: "Birds Eye Mixed Vegetables, 16 oz",
    price: 1000,
    qty: "250g",
    image: "https://spoonacular.com/productImages/98162-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    _id: 13333,
    title: "Del Monte Mixed Vegetables, 8.25 oz",
    price: 1000,
    qty: "250g",
    image: "https://spoonacular.com/productImages/13333-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    _id: 76119,
    title: "Del Monte Mixed Vegetables With Potatoes, 29 Oz",
    image: "https://spoonacular.com/productImages/76119-312x231.jpeg",
    imageType: "jpeg",
    price: 1000,
    qty: "250g",
  },
  {
    _id: 197185,
    title: "Birds Eye Mixed Vegetables, Frozen Vegetables, 80 Oz",
    image: "https://spoonacular.com/productImages/197185-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    _id: 72254,
    price: 100,
    qty: "250g",
    title: "Goya Goya  Mixed Vegetables, 16 oz",
    image: "https://spoonacular.com/productImages/72254-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    _id: 195908,
    title: "Herdez Mixed Vegetables. Bag",
    price: 100,
    qty: "250g",
    image: "https://spoonacular.com/productImages/195908-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    _id: 215251,
    title: "Pictsweet Farms® Mixed Vegetables 28 oz. Bag",
    image: "https://spoonacular.com/productImages/215251-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    _id: 46201,
    title: "Veg-All Original Mixed Vegetables, Canned Vegetables, 15 oz",
    image: "https://spoonacular.com/productImages/46201-312x231.png",
    imageType: "png",
  },
  {
    _id: 194571,
    title: "Veg-All Original Mixed Vegetables, Canned Vegetables, 29 oz",
    image: "https://spoonacular.com/productImages/194571-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    _id: 1099667,
    title: "Marketside Vegetable Medley, 12 oz",
    image: "https://spoonacular.com/productImages/1099667-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    _id: 144438,
    title: "Birds Eye Pepper Stir Fry Vegetables, Frozen Vegetables, 14 Oz",
    image: "https://spoonacular.com/productImages/144438-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    _id: 639565,
    title: "(6 Pack) Great Value Mixed Vegetables, 15 Oz",
    image: "https://spoonacular.com/productImages/639565-312x231.jpeg",
    imageType: "jpeg",
    price: 1000,
    qty: "250g",
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 1536, min: 1200 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1200, min: 900 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 900, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

const FreshItems = ({
  cartItems,
  setCartItems,
  wishlist,
  setWishlist,
  setTotalCost,
}) => {
  return (
    <Box py={2}>
      <Box display="flex">
        <Typography variant="h1" my={3} flexGrow={1}>
          Healthy Food
        </Typography>
        <Typography variant="h1" my={3}>
          صحي خواړه{" "}
        </Typography>

        {/* <Button
          sx={{
            fontWeight: "500",
            color: "#262626",
            "&:hover": {
              color: "#ffe033",
            },
          }}
          endIcon={<ChevronRightRoundedIcon />}
          disableRipple
        >
          View All
        </Button> */}
      </Box>

      <Carousel
        responsive={responsive}
        customRightArrow={<ArrowRight />}
        customLeftArrow={<ArrowLeft />}
        showDots={true}
        slidesToSlide={3}
        swipeable
        draggable
        autoPlaySpeed={400}
        arrows
        itemClass="custom-carousel-item"
      >
        {Vegetables.map((item) => {
          return (
            <ProductCard
              key={item._id}
              cartItems={cartItems}
              setCartItems={setCartItems}
              wishlist={wishlist}
              setWishlist={setWishlist}
              item={item}
              setTotalCost={setTotalCost}
            />
          );
        })}
      </Carousel>
    </Box>
  );
};

export default FreshItems;
