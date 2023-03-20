import React from "react";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
const Dashboard = () => {
  return (
    <div>
      <Container>
        <Paper>Total Sales</Paper>
        <Paper>Total Orders</Paper>
        <Paper>Total Products</Paper>
      </Container>
    </div>
  );
};

export default Dashboard;
