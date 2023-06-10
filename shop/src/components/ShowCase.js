import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ShowCase2 from "../assets/ShowCase/snow.jpg";
import ShowCase1 from "../assets/ShowCase/Car.jpg";
import ShowCase3 from "../assets/ShowCase/save time.jpg";
import { useTranslation } from "react-i18next";

const showcaseData = [
  {
    image: ShowCase1,
    title: "Shop from the comfort of your home",
  },
  {
    image: ShowCase2,
    title: "Escape the snow, shop from home",
  },
  {
    image: ShowCase3,
    title: "Shop online and save time",
  },
];

const ShowCase = () => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={1}>
      {showcaseData.map((item, index) => (
        <Grid key={index} item xs={12} md={6} lg={4}>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              height: 280,
              width: 380,
              borderRadius: 10,
              transition: "all .5s ease",
              boxShadow: "10px 10px 20px 3px rgba(0, 0, 0, .1)",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "10px 10px 30px 5px rgba(0, 0, 0, .3)",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(0deg, rgba(7,38,10,1) 46%, rgba(32,60,60,0) 100%)",
                opacity: 0.7,
              },
            }}
          >
            <img
              src={item.image}
              alt={`Showcase Image ${index + 1}`}
              sx={{ width: "auto", height: "100%" }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 40,
                px: 2,
                display: "flex",
                // width: '100%',
                px: 1,
                // display: 'flex',
                flexDirection: "column",
                "& h6": {
                  color: "white",
                },
                "& a": {
                  color: "white",
                  cursor: "pointer",
                  "&:active": {
                    transform: "scale(.9)",
                    transition: "all .2s ease",
                  },
                  "&:hover": {
                    // color: "var(--light-accent-color)",
                    color: "#ffe033",
                  },
                },
              }}
            >
              <Box width='100%'>
                <Typography variant="h6" pl={1}>{t(item.title)}</Typography>
              </Box>

              <Link to="/shop">
                <Typography pl={1}>{t("Shop Now")}</Typography>
              </Link>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ShowCase;
