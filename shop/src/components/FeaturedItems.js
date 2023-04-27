import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./reuseableComponents/ProductCard";
import { ArrowLeft, ArrowRight } from "./reuseableComponents/Arrow";
import { Box, Button, Typography } from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import './custom.css';
const bestSellers = [
  {
      "id": 152500,
      "title": "Fusion Gourmet Balis Best  Tea Candy, 42 ea",
      "image": "https://spoonacular.com/productImages/152500-312x231.jpeg",
      "imageType": "jpeg"
  },
  {
      "id": 1094015,
      "title": "Neonblond My best Friend a Yonaguni Horse Mug gift for Coffee Tea lovers",
      "image": "https://spoonacular.com/productImages/1094015-312x231.jpeg",
      "imageType": "jpeg"
  },
  {
      "id": 763159,
      "title": "Neonblond Worlds Best Ma Mug gift for Coffee Tea lovers",
      "image": "https://spoonacular.com/productImages/763159-312x231.jpeg",
      "imageType": "jpeg"
  },
  {
      "id": 1406403,
      "title": "Neonblond My Dad is the Best Father's Day Teal Mustache Mug gift for Coffee Tea lovers",
      "image": "https://spoonacular.com/productImages/1406403-312x231.jpeg",
      "imageType": "jpeg"
  },
  {
      "id": 1332527,
      "title": "Neonblond My best Friend a American Wirehair Cat from United States Mug gift for Coffee Tea lovers",
      "image": "https://spoonacular.com/productImages/1332527-312x231.jpeg",
      "imageType": "jpeg"
  },
  {
      "id": 1849127,
      "title": "Seattles Best By Starbucks (10 Lbs) 6th Avenue Bistro Ground Coffee 6oz Each",
      "image": "https://spoonacular.com/productImages/1849127-312x231.jpeg",
      "imageType": "jpeg"
  },
  {
      "id": 997713,
      "title": "Father?s Day Gift for Brothers What An Awesome Brother Looks Like World?s Best Bro Ever Graduation Birthday Christmas Gift from Sister Novelty Gag Gifts Idea for Sibling Ceramic Coffee Mug Tea Cup",
      "image": "https://spoonacular.com/productImages/997713-312x231.jpeg",
      "imageType": "jpeg"
  },
  {
      "id": 1123829,
      "title": "Neonblond My Dad is the Best Father's Day Green Texture Mug gift for Coffee Tea lovers",
      "image": "https://spoonacular.com/productImages/1123829-312x231.jpeg",
      "imageType": "jpeg"
  },
  {
      "id": 815399,
      "title": "(6 Pack) BUSH'S BEST Reduced Sodium Great Northern Beans, 15.8 OZ",
      "image": "https://spoonacular.com/productImages/815399-312x231.jpeg",
      "imageType": "jpeg"
  }
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

const FeaturedItems = ({ Cart, setCart, wishlist, setWishlist }) => {
  return (
    <Box py={2}>
      <Box display="flex">
        <Typography variant="h1" my={3} flexGrow={1}>
          Featured Items
        </Typography>
        <Button
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
        </Button>
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
        {bestSellers.map((item) => {
          return (
            <ProductCard
              key={item.id}
              image={item.image}
              price={item.price}
              qty={item.qty}
              title={item.title}
              Cart={Cart}
              setCart={setCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
              item={item}
            />
          );
        })}
      </Carousel>
    </Box>
  );
};

export default FeaturedItems;
