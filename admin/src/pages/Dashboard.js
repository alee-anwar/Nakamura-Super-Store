import React from "react";
import Paper from "@mui/material/Paper";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Box>
       <Box sx={ theme.mixins.toolbar}/>
      <Typography variant="h1" >Dashboard</Typography>
      <Grid container spacing={4}>
        <Grid item md={4}>
          <Paper>Total Sales</Paper>
        </Grid>
        <Grid item md={4}>
          <Paper>Total Sales</Paper>
        </Grid>
        <Grid item md={4}>
          <Paper>Total Sales</Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
