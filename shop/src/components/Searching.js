import React, { useEffect, useState } from "react";
import "./custom.css";
import { Box, Stack, Typography } from "@mui/material";
import Logo from "../assets/bottle.gif";
import ErrorMessage from "./ErrorMessage";

const Searching = () => {
  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    // Set a timeout to display "Product Not Found" after 3 seconds
    const timeout = setTimeout(() => {
      setShowNotFound(true);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        pb: 20,
      }}
    >
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {showNotFound ? (
          <Box pt={20}>
            <ErrorMessage
              path={"/shop"}
              errorMessage={"Product Not Found"}
              linkMsg={"Return to shopping"}
            />
          </Box>
        ) : (
          <>
            <Box className="loading-animation"></Box>

            <Typography color="primary" letterSpacing={2} fontWeight={500}>
              Searching
            </Typography>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Searching;
