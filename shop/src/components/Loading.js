import React, { useEffect, useState } from "react";
import "./custom.css";
import { Box } from "@mui/material";
import Logo from "../assets/bottle.gif";
import EmptyMessage from "./EmptyMessage";

const Loading = () => {
  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    // Set a timeout to display "Product Not Found" after 3 seconds
    const timeout = setTimeout(() => {
      setShowNotFound(true);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        // flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        pb: 20,
      }}
    >
        {showNotFound ? (
          <Box pt={20}>
            <EmptyMessage
              path={"/shop"}
              errorMessage={"Product Not Found"}
              linkMsg={"Return to shopping"}
            />
          </Box>
        ) : (
          <Box
            component="img"
            src={Logo}
            sx={{ height: "20vh", width: "auto" }}
          />
        )}
      {/* <div  className="loading-animation">
        <span></span>
        <span></span>
        <span></span>
      </div > */}
    </Box>
  );
};

export default Loading;
