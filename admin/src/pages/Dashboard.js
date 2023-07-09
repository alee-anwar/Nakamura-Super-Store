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
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import SalesBarGraph from "../components/SalesBarGraph ";
import ReportComponent from "../components/ReportComponent";
import axios from "axios";
import moment from "moment";

const Dashboard = ({
  user,
  totalSales,
  totalProducts,
  totalOrders,
  totalReviews,
  completedOrders,
  pendingOrders,
  rejectedOrders,
  inStockProducts,
  outOfStockProducts,
  positiveReviews,
  negativeReviews,
}) => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [deleted, setDeleted] = useState(false);

  // useEffect(() => {
  //   fetch("http://localhost:3000/orderList/viewOrders")
  //     .then((res) => res.json())
  //     .then((data) => setOrders(data));
  // }, [deleted, totalOrders]);

  // useEffect(() => {
  //   const today = new Date().toISOString().split("T")[0]; // Get today's date in the format 'YYYY-MM-DD'

  //   fetch("http://localhost:3000/orderList/viewOrders")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // Filter orders to include only today's orders
  //       const todayOrders = data.filter((order) => {
  //         const orderDate = new Date(order.orderDate)
  //           .toISOString()
  //           .split("T")[0]; // Convert orderDate to ISO string and get the date portion
  //         return orderDate === today;
  //       });

  //       setOrders(todayOrders);
  //     })
  //     .catch((error) => console.log(error));
  // }, [deleted, totalOrders]);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to 00:00:00:000 (midnight)
    const todayDateString = today.toISOString().split("T")[0]; // Get today's date in the format 'YYYY-MM-DD'
    console.log("todayDateString: " + todayDateString)

    fetch("http://localhost:3000/orderList/viewOrders")
      .then((res) => res.json())
      .then((data) => {
        // Filter orders to include only today's orders
        const todayOrders = data.filter((order) => {
          const orderDate = new Date(order.orderDate);
          const orderDateString = orderDate.toISOString().split("T")[0]; // Get the order's date in the format 'YYYY-MM-DD'
          console.log("orderDateString: " + orderDateString)

          return orderDateString === todayDateString;
        });

        console.log("Today's Orders:", todayOrders);
        setOrders(todayOrders);
      })
      .catch((error) => console.log(error));
  }, [deleted, totalOrders]);
  
  

  const handleDeleteOrder = async (id) => {
    await axios
      .delete(`http://localhost:3000/orderList/deleteOrder/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
    const newOrders = orders.filter((order) => order.orderId !== id);
    setOrders(newOrders);
    setDeleted(true);
  };

  const columns = [
    { field: "id", headerName: "OID", width: 100 },
    { field: "customerName", headerName: "Customer Name", width: 150 },
    { field: "productName", headerName: "Product Name", width: 150 },
    { field: "shippingMethod", headerName: "Shipping Method", width: 150 },
    // { field: "customerName", headerName: "Name", width: 250 },
    // { field: "phoneNo", headerName: "Phone#", width: 150 },
    { field: "totalPrice", headerName: "Total (AFN)", width: 110 },
    { field: "town", headerName: "Order City", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "date", headerName: "Date", width: 130 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        // <DotsMenuBtn product={params.id} handleDelete={handleDelete}/>
        <DotsMenuBtn
          product={params.row}
          handleDelete={handleDeleteOrder}
          viewType="order"
        />
      ),
      width: 150,
    },
  ];

  const rows = orders.map((row) => ({
    id: row.orderId,
    customerName: `${row.firstName || ""} ${row.lastName || ""}`,
    productName: row.orderItems[0].productName,
    shippingMethod: row.shippingMethod,
    // customerName: row.customerName,
    // phoneNo: row.phoneNo,
    totalPrice: row.totalPrice,
    town: row.town,
    status: row.status,
    date: moment(row.date).format("DD/MM/YYYY"),
  })).reverse();

  return (
    <Box mb={4}>
      <Box sx={theme.mixins.toolbar} />
      <Typography variant="h1">
        As-Salaam-Alaikum, {user[0].userName}
      </Typography>

      <Container maxWidth="lg" sx={{ my: 5 }}>
        <Grid container spacing={2}>
          <Grid item sm={3}>
            <Paper
              sx={{
                padding: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "#ffd800", mr: 1, width: 50, height: 50 }}>
                <AccountBalanceWalletIcon />
              </Avatar>
              <Stack>
                <Typography color="textSecondary">Total Sales</Typography>
                <Typography>{totalSales}</Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item sm={3}>
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

          <Grid item sm={3}>
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

          <Grid item sm={3}>
            <Paper
              sx={{
                padding: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "#ff9017", mr: 1, width: 50, height: 50 }}>
                <StarRoundedIcon />
              </Avatar>
              <Stack>
                <Typography color="textSecondary">Total Reviews</Typography>
                <Typography>{totalReviews}</Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <ReportComponent
        completedOrders={completedOrders}
        pendingOrders={pendingOrders}
        rejectedOrders={rejectedOrders}
        inStockProducts={inStockProducts}
        outOfStockProducts={outOfStockProducts}
        positiveReviews={positiveReviews}
        negativeReviews={negativeReviews}
      />
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
