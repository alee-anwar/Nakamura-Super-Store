import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import { ArrowLeft, ArrowRight } from "./reuseableComponents/Arrow";
import { Box, Button, Typography } from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import "./custom.css";
import axios from "axios";
const bestSellers = [
  {
    _id: 152500,
    titleTitle: "Fusion Gourmet Balis Best  Tea Candy, 42 ea",
    size: "250g",
    image: "https://spoonacular.com/productImages/152500-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    _id: 1094015,
    productTitle:
      "Neonblond My best Friend a Yonaguni Horse Mug gift for Coffee Tea lovers",
    image: "https://spoonacular.com/productImages/1094015-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    _id: 763159,
    productTitle: "Neonblond Worlds Best Ma Mug gift for Coffee Tea lovers",
    image: "https://spoonacular.com/productImages/763159-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    _id: 1406403,
    productTitle:
      "Neonblond My Dad is the Best Father's Day Teal Mustache Mug gift for Coffee Tea lovers",
    image: "https://spoonacular.com/productImages/1406403-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    _id: 1332527,
    productTitle:
      "Neonblond My best Friend a American Wirehair Cat from United States Mug gift for Coffee Tea lovers",
    image: "https://spoonacular.com/productImages/1332527-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    _id: 1849127,
    productTitle:
      "Seattles Best By Starbucks (10 Lbs) 6th Avenue Bistro Ground Coffee 6oz Each",
    image: "https://spoonacular.com/productImages/1849127-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    _id: 997713,
    productTitle:
      "Father?s Day Gift for Brothers What An Awesome Brother Looks Like World?s Best Bro Ever Graduation Birthday Christmas Gift from Sister Novelty Gag Gifts Idea for Sibling Ceramic Coffee Mug Tea Cup",
    image: "https://spoonacular.com/productImages/997713-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    _id: 1123829,
    productTitle:
      "Neonblond My Dad is the Best Father's Day Green Texture Mug gift for Coffee Tea lovers",
    image: "https://spoonacular.com/productImages/1123829-312x231.jpeg",
    imageType: "jpeg",
  },
  {
    _id: 815399,
    productTitle:
      "(6 Pack) BUSH'S BEST Reduced Sodium Great Northern Beans, 15.8 OZ",
    image: "https://spoonacular.com/productImages/815399-312x231.jpeg",
    imageType: "jpeg",
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

const FeaturedItems = ({
  cartItems,
  setCartItems,
  wishlist,
  setWishlist,
  setTotalCost,
}) => {
  const [featuredItems, setFeaturedItems] = useState(bestSellers);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // setIsLoading(true);
  //       const response = await axios.get(
  //         "http://localhost:3000/productList/viewProducts",
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       setFeaturedItems(response.data);
  //       // setIsLoading(false);
  //     } catch (error) {
  //       setError(error.message);
  //       // setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <Box py={2}>
      <Box display="flex">
        <Typography variant="h1" my={3} flexGrow={1}>
          Featured Items
        </Typography>
        <Typography variant="h1" my={3}>
          ځانګړي توکي
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
        {featuredItems.map((item) => {
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

export default FeaturedItems;
