import React from "react";
import { Box, Typography } from "@mui/material";
import AppbarSign from "./Appbar/AppbarSign";
import { useTheme } from '@mui/material/styles';

function SignLayout(props) {
  const theme = useTheme();

  return (
    <Box>
      <AppbarSign/>
      <Box sx={ theme.mixins.toolbar}/>
      <Box>{props.children}</Box>
    </Box>
  );
}

export default SignLayout;
