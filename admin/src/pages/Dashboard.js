import React from "react";
import Paper from "@mui/material/Paper";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Box>
       <Box sx={ theme.mixins.toolbar}/>
      <Typography variant="h1" >Welcome, Nakamura</Typography>
    </Box>
  );
};

export default Dashboard;
