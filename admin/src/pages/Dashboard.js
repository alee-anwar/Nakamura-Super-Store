import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import DotsMenuBtn from "../components/DotsMenuBtn";
import React, { useEffect, useState } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import SalesBarGraph from "../components/SalesBarGraph ";
import ReportComponent from "../components/ReportComponent";

const Dashboard = ({ user, totalSales, totalProducts, totalOrders }) => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [deleted, setDeleted] = useState(false);

  // useEffect(() => {
  //   fetchProducts(); // Call the fetchProducts method from App.js
  //   console.log("useEffect with Fetch prduct from dashboard")
  // }, [fetchProducts]);

  useEffect(() => {
    fetch("http://localhost:3000/orderList/viewOrders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [deleted, totalOrders]);

  const handleDelete = async (id) => {
    await fetch("http://localhost:3000/orderList/deleteOrder/" + id, {
      method: "DELETE",
    });
    const newOrders = orders.filter((order) => order.id !== id);
    setOrders(newOrders);
    setDeleted(true);
  };

  const columns = [
    { field: "id", headerName: "OID", width: 100 },
    { field: "customerName", headerName: "Name", width: 250 },
    { field: "phoneNo", headerName: "Phone#", width: 150 },
    { field: "totalPrice", headerName: "Total", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <DotsMenuBtn product={params.row} handleDelete={handleDelete} />
      ),
      width: 150,
    },
  ];

  const rows = orders.map((row) => ({
    id: row.orderId,
    customerName: row.customerName,
    phoneNo: row.phoneNo,
    totalPrice: row.totalPrice,
    status: row.status,
    date: row.date,
  }));

  return (
    <Box>
      <Box sx={theme.mixins.toolbar} />
      <Typography variant="h1">
        As-Salaam-Alaikum, {user[0].userName}
      </Typography>

      <Container maxWidth="lg" sx={{ my: 5 }}>
        <Grid container spacing={2}>
          <Grid item sm={4}>
            <Paper
              sx={{
                padding: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "#ff9017", mr: 1, width: 50, height: 50 }}>
                <AccountBalanceWalletIcon />
              </Avatar>
              <Stack>
                <Typography color="textSecondary">Total Sales</Typography>
                <Typography>AFN. {totalSales}</Typography>
              </Stack>
            </Paper>
          </Grid>

          <Grid item sm={4}>
            <Paper
              sx={{
                padding: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "#00b517", mr: 1, width: 50, height: 50 }}>
                <ViewStreamIcon />
              </Avatar>
              <Stack>
                <Typography color="textSecondary">Total Orders</Typography>
                <Typography>{totalOrders}</Typography>
              </Stack>
            </Paper>
          </Grid>

          <Grid item sm={4}>
            <Paper
              sx={{
                padding: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "#3167eb", mr: 1, width: 50, height: 50 }}>
                <LocalMallRoundedIcon />
              </Avatar>
              <Stack>
                <Typography color="textSecondary">Total Products</Typography>
                <Typography>{totalProducts}</Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <ReportComponent />
      <SalesBarGraph />
      <Box>
        <Box sx={{ display: "flex" }} mb={3}>
          <Typography sx={{ flexGrow: 1 }} fontWeight={700} variant="h6">
            Today, Orders
          </Typography>
        </Box>

        <div style={{ height: "78vh", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              ...orders.initialState,
              pagination: { paginationModel: { pageSize: 9 } },
            }}
            pageSizeOptions={[9, 18, 36]}
          />
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
