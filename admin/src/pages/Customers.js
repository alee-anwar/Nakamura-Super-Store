import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
// import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DotsMenuBtn from "../components/DotsMenuBtn";

const Customers = () => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3000/customerList/viewAllCustomers")
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, [deleted]);

  const handleDelete = async (id) => {
    await fetch("http://localhost:3000/customerList/deleteCustomer/" + id, {
      method: "DELETE",
    });
    const newCustomers = customers.filter((customer) => customer.id !== id);
    setCustomers(newCustomers);
    setDeleted(true);
  };

  console.log(customers);
  const columns = [
    { field: "id", headerName: "ID", width: 110 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "phoneNo", headerName: "Phone", width: 160 },
    { field: "town", headerName: "Town", width: 180 },
    { field: "streetNo", headerName: "Street", width: 130 },
    { field: "houseNo", headerName: "House", width: 130 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <DotsMenuBtn product={params.id} handleDelete={handleDelete} viewType="customer"/>
      ),
      width: 150,
    },
  ];
  // const threedots = <MoreHorizRoundedIcon/>;
  const rows = customers.map((row) => ({
    id: row._id.slice(-7), // Extract the last 6 digits of the ID
    firstName: row.firstName,
    lastName: row.lastName,
    phoneNo: row.phoneNo,
    town: row.town,
    streetNo: row.streetNo,
    houseNo: row.houseNo,
  })).reverse();

  // console.log(products);
  // const getRowId = (row) => row._id
  return (
    <Box>
      <Box sx={theme.mixins.toolbar} />
      <Box sx={{ display: "flex" }} mb={3}>
        <Typography sx={{ flexGrow: 1 }} variant="h1">
          Customers
        </Typography>
        <Button variant="contained">Add Customer</Button>
      </Box>

      <div style={{ height: "78vh", width: "100%" }}>
        <DataGrid
          rows={rows}
          // getRowId={(rows) => rows._id}
          columns={columns}
          initialState={{
            ...customers.initialState,
            pagination: { paginationModel: { pageSize: 9 } },
          }}
          pageSizeOptions={[9, 18, 36]}
        />
      </div>
    </Box>
  );
};

export default Customers;
