import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const Products = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const columns = [
    { field: "id", headerName: "SKU", width: 100 },
    {
      field: "image",
      headerName: "Image",
      width: 120,
      renderCell: (params) => (
        <img src={params.value} alt="url" style={{ width: 50 }} />
      ),
    },
    { field: "name", headerName: "Name", width: 250 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => <MoreHorizRoundedIcon />,
      width: 150,
    },
  ];
  // const threedots = <MoreHorizRoundedIcon/>;
  const rows = data.map((row) => ({
    id: row.id,
    image: row.image,
    name: row.name,
    category: row.category,
    price: row.price,
    status: row.status,
    date: row.date,
  }));

  console.log(data);

  return (
    <Box>
      <Box sx={theme.mixins.toolbar} />
      <Box sx={{ display: "flex" }} mb={3}>
        <Typography sx={{ flexGrow: 1 }} variant="h1">
          Products
        </Typography>
        <Button variant="contained" onClick={() => navigate("/createproduct")}>
          Create Product
        </Button>
      </Box>

      <div style={{ height: "78vh", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 9 } },
          }}
          pageSizeOptions={[9, 18, 36]}
        />
      </div>
    </Box>
  );
};

export default Products;
