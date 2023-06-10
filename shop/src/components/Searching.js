import React, { useEffect, useState } from "react";
import "./custom.css";
import { Box, Stack, Typography } from "@mui/material";
import Logo from "../assets/bottle.gif";
import ErrorMessage from "./ErrorMessage";
import { useTranslation } from "react-i18next";

const Searching = () => {
  const [showNotFound, setShowNotFound] = useState(false);
  const { t } = useTranslation();

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
              errorMessage={t("Product Not Found")}
              linkMsg={t("Return to shopping")}
            />
          </Box>
        ) : (
          <>
            <Box className="loading-animation"></Box>

            <Typography color="primary" letterSpacing={2} fontWeight={500}>
              {t('Searching')}
            </Typography>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Searching;
