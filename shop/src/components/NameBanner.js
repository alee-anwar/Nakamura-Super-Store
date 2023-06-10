import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useTranslation } from "react-i18next";


const useStyles = makeStyles((theme) => ({
  banner: {
    width: "100%",
    height: 200,
    // backgroundColor: "#f5f5f5",
    // background: "linear-gradient(to right, #e8e8e8, #c0c0c0)",
    background: "linear-gradient(to right, #ffe033, #f5f5f5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",

  },
  heading: {
    fontFamily: "Roboto",
    // fontSize: "3rem",
    fontWeight: "bold",
    color: "#333",
    textShadow: "1px 1px 1px #ccc",
    transition: "transform 0.3s ease-in-out", // Add transition for a smooth effect
    "&:hover": {
      transform: "scale(1.1)", // Add hover effect (scaling the heading)
    },
  },
}));

const NameBanner = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <div className={classes.banner}>
        <Typography variant="h1" component="h2" className={classes.heading}>
          {t('Welcome To Nakamura')}
        </Typography>
      </div>
    </div>
  );
};

export default NameBanner;

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


