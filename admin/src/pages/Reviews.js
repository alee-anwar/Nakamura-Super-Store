import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
// import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DotsMenuBtn from "../components/DotsMenuBtn";

const Reviews = () => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/reviewList/viewReviews")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch("http://localhost:3000/reviewList/viewReviews" + id, {
      method: "DELETE",
    });
    const newOrders = orders.filter((order) => order.id !== id);
    setOrders(newOrders);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "sku", headerName: "SKU", width: 100 },
    { field: "product", headerName: "Product", width: 250 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "rating", headerName: "Rating", width: 150 },
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
    sku: row.sku,
    product: row.product,
    name: row.name,
    rating: row.rating,
    date: row.date,
  }));

  // console.log(products);

  return (
    <Box>
      <Box sx={theme.mixins.toolbar} />
      <Box sx={{ display: "flex" }} mb={3}>
        <Typography sx={{ flexGrow: 1 }} variant="h1">
          Reviews
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
  );
};

export default Reviews;
