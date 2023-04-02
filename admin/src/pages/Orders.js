import { Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DotsMenuBtn from "../components/DotsMenuBtn";

const Orders = () => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/products/" + id, {
      method: "DELETE",
    });
    const newOrders = orders.filter((order) => order.id !== id);
    setOrders(newOrders);
  };

  const columns = [
    { field: "id", headerName: "OID", width: 100 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "phone", headerName: "Phone#", width: 150 },
    { field: "total", headerName: "Total", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <DotsMenuBtn product={params.id} handleDelete={handleDelete}/>
      ),
      width: 150,
    },
  ];
  // const threedots = <MoreHorizRoundedIcon/>;
  const rows = orders.map((row) => ({
    id: row.id,
    name: row.name,
    phone: row.phone,
    total: row.total,
    status: row.status,
    date: row.date,
  }));

  // console.log(products);

  return (
    <Box>
      <Box sx={theme.mixins.toolbar} />
      <Box sx={{ display: "flex" }} mb={3}>
        <Typography sx={{ flexGrow: 1 }} variant="h1">
          Orders
        </Typography>
        <Button variant="contained">
        Add Order
        </Button>
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
