import { Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DotsMenuBtn from "../components/DotsMenuBtn";

const Customers = () => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch("https://jsonplaceholder.typicode.com/users" + id, {
      method: "DELETE",
    });
    const newCustomers = customers.filter((order) => order.id !== id);
    setCustomers(newCustomers);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 100 },
    { field: "phone", headerName: "Phone#", width: 250 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "password", headerName: "Password", width: 150 },
    { field: "address", headerName: "Address", width: 150 },
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
    email: row.email,
    passowrd: row.passowrd,
    address: row.address,
  }));

  // console.log(products);

  return (
    <Box>
      <Box sx={theme.mixins.toolbar} />
      <Box sx={{ display: "flex" }} mb={3}>
        <Typography sx={{ flexGrow: 1 }} variant="h1">
          Customers
        </Typography>
        <Button variant="contained">
        Add Customer
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

export default Customers;
