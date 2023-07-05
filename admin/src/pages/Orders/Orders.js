import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
// import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DotsMenuBtn from "../../components/DotsMenuBtn";
import axios from "axios";
import moment from "moment";

const Orders = ({ fetchOrders, orders, setOrders }) => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [deleted]);

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
  // const threedots = <MoreHorizRoundedIcon/>;
  const rows = orders
    .map((row) => ({
      id: row.orderId,
      customerName: `${row.firstName || ''} ${row.lastName || ''}`,
      productName: row.orderItems[0].productName,
      shippingMethod: row.shippingMethod,
      // customerName: row.customerName,
      // phoneNo: row.phoneNo,
      totalPrice: row.totalPrice,
      town: row.town,
      status: row.status,
      date: moment(row.date).format("DD/MM/YYYY"),
    }))
    .reverse(); // Reverse the order of rows array to display latest orders first

  // console.log(products);

  return (
    <Box>
      <Box sx={theme.mixins.toolbar} />
      <Box sx={{ display: "flex" }} mb={3}>
        <Typography sx={{ flexGrow: 1 }} variant="h1">
          Orders
        </Typography>
        {/* <Button variant="contained">Add Order</Button> */}
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
  );
};

export default Orders;
