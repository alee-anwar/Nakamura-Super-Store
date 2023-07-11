import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import { ArrowLeft, ArrowRight } from "./reuseableComponents/Arrow";
import { Box, Button, Typography } from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import "./custom.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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
  featuredProducts
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
          {t("Featured Items")}
        </Typography>

        <Button
          sx={{
            fontWeight: "500",
            color: "#262626",
            "&:hover": {
              color: "#ffe033",
              textDecoration: "underline",

            },
          }}
          endIcon={<ChevronRightRoundedIcon />}
          disableRipple
          onClick={() => navigate('/shop')}
        >
          {t('View All')}
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
        {featuredProducts.map((item) => {
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
