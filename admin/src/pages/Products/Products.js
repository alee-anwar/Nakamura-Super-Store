import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DotsMenuBtn from "../../components/DotsMenuBtn";
import axios from "axios";
import moment from 'moment';

const Products = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fetch("http://localhost:8000/products")
    //   .then((res) => res.json())
    //   .then((data) => setProducts(data));
    axios
      .get("http://localhost:4000/productList/viewProducts")
      .then((res) => setProducts(res.data));
  }, []);

  // const handleDelete = async (id) => {
  //   await fetch("http://localhost:8000/products/" + id, {
  //     method: "DELETE",
  //   });
  //   const newProducts = products.filter((product) => product.id !== id);
  //   setProducts(newProducts);
  // };
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/products/${id}`);
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
  };
  
  const columns = [
    { field: "id", headerName: "SKU", width: 60 },
    {
      field: "image",
      headerName: "Image",
      width: 80,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="url"
          style={{ width: 45, height: 40, border: "5px solid #f7f7f7" }}
        />
      ),
    },
    { field: "title", headerName: "Name", width: 150 },
    { field: "category", headerName: "Category", width: 120 },
    { field: "subcategory", headerName: "Sub Category", width: 130 },
    { field: "price", headerName: "Price", width: 100, valueFormatter: ({ value }) => `Rs ${value}` },
    { field: "color", headerName: "Color", width: 100 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "tag", headerName: "Tag", width: 100 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "date", headerName: "Date", width: 100 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <DotsMenuBtn product={params.row} handleDelete={handleDelete}/>
      ),
      width: 100,
    },
  ];
  // const threedots = <MoreHorizRoundedIcon/>;
  const rows = products.map((row) => ({
    id: row.id,
    image: row.image,
    title: row.title,
    category: row.category,
    price: row.price,
    status: row.status,
    subcategory : row.subcategory,
    color: row.color,
    quantity: row.quantity,
    tag: row.tag,
    date: moment(row.date).format('DD/MM/YYYY')
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
