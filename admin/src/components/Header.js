import { Typography } from "@mui/material";
import React from "react";
import { useTheme } from '@mui/material/styles';
import { Box } from "@mui/system";

const Header = ({ title }) => {
  const theme = useTheme();
  return (
    <Box sx={{display: 'inline-block'}}>
      <Box sx={ theme.mixins.toolbar}/>
      <Typography variant="h1" >{title}</Typography>

    </Box>
  );
};

export default Header;
