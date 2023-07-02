import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import AppbarSign from "./Appbar/AppbarSign";
import { useTheme } from "@mui/material/styles";

function AuthLayout(props) {
  const theme = useTheme();

  // useEffect(() => {
  //   return () => {
  //     window.location.href = "/login"
  //   }
  // })
  
  
  return (
    <Box>
      <AppbarSign />
      <Box sx={theme.mixins.toolbar} />
      <Box>{props.children}</Box>
    </Box>
  );
  
}

export default AuthLayout;
