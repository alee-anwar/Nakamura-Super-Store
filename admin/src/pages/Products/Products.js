import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DotsMenuBtn from "../../components/DotsMenuBtn";
import axios from "axios";
import moment from "moment";
const Products = ({ setTotalProducts, totalProducts }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [deleted, setDeleted] = useState(false);

  // console.log(products);
  useEffect(() => {
    const token=localStorage.getItem("token")
    axios
      .get("http://localhost:3000/productList/viewProducts", {
        headers: {
          "Content-Type": "application/json",
          // Authorization:`bearer ${token}`
          // Authorization:token
        },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err.message));
  }, [deleted, totalProducts]);

  if (products) {
    setTotalProducts(products.length);
  }

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:3000/productList/deleteProduct/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
    const newProducts = products.filter((product) => product._id !== id);
    setProducts(newProducts);
    setDeleted(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "sku", headerName: "SKU", width: 50 },
    {
      field: "image",
      headerName: "Image",
      width: 70,
      renderCell: (params) => {
        return (
          // console.log(params.row.image)
          <img
            src={params.row.image}
            alt={params.row.productTitle}
            height="90%"
            width="90%"
            style={{ border: "5px solid white" }}
          />
        );
      },
    },
    { field: "productTitle", headerName: "Name", width: 120 },
    { field: "category", headerName: "Category", width: 120 },
    { field: "subcategory", headerName: "Sub Category", width: 130 },
    {
      field: "price",
      headerName: "Price",
      width: 80,
      valueFormatter: ({ value }) => `AFN ${value}`,
    },
    { field: "color", headerName: "Color", width: 80 },
    // { field: "quantity", headerName: "Quantity", width: 80 },
    { field: "stock", headerName: "Stock", width: 70 },
    { field: "tag", headerName: "Tag", width: 100 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "date", headerName: "Date", width: 100 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <DotsMenuBtn
          product={params.row}
          handleDelete={handleDelete}
          viewType="product"
        />
      ),
      width: 100,
    },
  ];
  // const threedots = <MoreHorizRoundedIcon/>;
  const rows = products.map((row) => ({
    id: row._id.slice(-7), // Extract the last 6 digits of the ID
    sku: row.sku,
    image: row.image,
    productTitle: row.productTitle,
    category: row.category,
    price: row.price,
    status: row.status,
    subcategory: row.subcategory,
    color: row.color,
    stock: row.stock,
    tag: row.tag,
    date: moment(row.date).format("DD/MM/YYYY"),
  }));

  // console.log(products);

  return (
    <Box>
      <Box sx={theme.mixins.toolbar} />
      <Box sx={{ display: "flex" }} mb={3}>
        <Typography sx={{ flexGrow: 1 }} variant="h1">
          Products
        </Typography>
        <Button variant="contained" onClick={() => navigate("/createproduct")}>
          Add Product
        </Button>
      </Box>

      <div style={{ height: "78vh", width: "100%" }}>
        <DataGrid
          // rows={rows}
          // columns={columns}
          // pageSize={9}
          // pagination
          // rowsPerPageOptions={[9, 18, 36]}
          rows={rows}
          columns={columns}
          initialState={{
            ...products.initialState,
            pagination: { paginationModel: { pageSize: 9 } },
          }}
          pageSizeOptions={[9, 18, 36]}
        />
      </div>
    </Box>
  );
};

export default Products;
