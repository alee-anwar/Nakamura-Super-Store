import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Advertisement1 from "../assets/Advertisement/Grocery Discount Voucher Coupon (1475 × 256 px).png";
import Advertisement2 from "../assets/Advertisement/Green White Simple Grocery Online Store Etsy Cover.png";
import Advertisement3 from "../assets/Advertisement/Green Ecobag Safer Grocery Delivery Banner (1475 × 256 px).png";

const NameBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3); // Change the modulo value based on the number of images you have
    }, 4000); // Change the time (in milliseconds) after which the image should change

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Carousel
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        selectedItem={activeIndex}
      >
        <div>
          <img src={Advertisement1} alt="Advertisement 1" />
        </div>
        <div>
          <img src={Advertisement2} alt="Advertisement 2" />
        </div>
        <div>
          <img src={Advertisement3} alt="Advertisement 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default NameBanner;

// import { Typography } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import React from "react";
// import { useTranslation } from "react-i18next";

// const useStyles = makeStyles((theme) => ({
//   banner: {
//     width: "100%",
//     height: 200,
//     // backgroundColor: "#f5f5f5",
//     // background: "linear-gradient(to right, #e8e8e8, #c0c0c0)",
//     background: "linear-gradient(to right, #ffe033, #f5f5f5)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 20,
//     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",

//   },
//   heading: {
//     fontFamily: "Roboto",
//     // fontSize: "3rem",
//     fontWeight: "bold",
//     color: "#333",
//     textShadow: "1px 1px 1px #ccc",
//     transition: "transform 0.3s ease-in-out", // Add transition for a smooth effect
//     "&:hover": {
//       transform: "scale(1.1)", // Add hover effect (scaling the heading)
//     },
//   },
// }));

// const NameBanner = () => {
//   const classes = useStyles();
//   const { t } = useTranslation();

//   return (
//     <div>
//       <div className={classes.banner}>
//         <Typography variant="h1" component="h2" className={classes.heading}>
//           {t('Welcome To Nakamura')}
//         </Typography>
//       </div>
//     </div>
//   );
// };

// export default NameBanner;

// import React from "react";
// import { Typography } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import { useTranslation } from "react-i18next";

// const useStyles = makeStyles((theme) => ({
//   banner: {
//     width: "100%",
//     height: 200,
//     background: "linear-gradient(to right, #507aa8, #c0c0c0)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 20,
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//   },
//   heading: {
//     fontFamily: "Roboto",
//     fontSize: "3rem",
//     fontWeight: "bold",
//     color: "#333",
//     textShadow: "1px 1px 1px #ccc",
//     transition: "transform 0.3s ease-in-out",
//     "&:hover": {
//       transform: "scale(1.1)",
//     },
//   },
// }));

// const NameBanner = () => {
//   const classes = useStyles();
//   const { t } = useTranslation();

//   return (
//     <div>
//       <div className={classes.banner}>
//         <Typography variant="h1" component="h2" className={classes.heading}>
//           {t("Welcome To Nakamura")}
//         </Typography>
//       </div>
//     </div>
//   );
// };

// export default NameBanner;
