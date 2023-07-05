import { Avatar, Box, Button, Skeleton, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Carousel from "react-multi-carousel";
import PropTypes from "prop-types";
import { categories } from "./reuseableComponents/allCategories";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 1536, min: 1200 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 1200, min: 900 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 900, min: 600 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 3,
  },
};

const ShopByCategories = ({ handleCategoryClick }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <Box mt={2}>
      <Box display="flex">
        <Typography variant="h1" my={3} flexGrow={1}>
          {t("Shop By Categories")}
        </Typography>
      </Box>
      <Carousel responsive={responsive} showArrows={false}>
        {categories.map((category) => (
          <Box key={category.id}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => navigate(`/shop/${category.value}`)}
              style={{ cursor: "pointer" }}
            >
              {category.url ? (
                <Avatar
                  alt={category.alt}
                  src={category.url}
                  sx={{
                    border: "1px solid grey",
                    width: { xs: 110, sm: 135, md: 150 },
                    height: { xs: 110, sm: 135, md: 150 },
                    transition: "transform 0.5s ease",
                    "&:active": {
                      transform: "scale(0.9)",
                    },
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "5px 5px 10px 1px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                />
              ) : (
                // <Skeleton
                //   sx={{ bgcolor: "grey.500", borderRadius: "50%" }}
                //   variant="rectangular"
                //   width={{ xs: 110, sm: 135, md: 150 }}
                //   height={{ xs: 110, sm: 135, md: 150 }}
                //   // borderRadius="50%"
                // />
                <Skeleton
                  variant="circular"
                  sx={{
                    bgcolor: "grey.500",
                    borderRadius: "50%",
                    width: { xs: 110, sm: 135, md: 150 },
                    height: { xs: 110, sm: 135, md: 150 },
                  }}
                />
              )}
            </Box>
            <Typography textAlign="center">{t(category.label)}</Typography>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default ShopByCategories;
