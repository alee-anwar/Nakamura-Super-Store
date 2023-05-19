import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
// import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DotsMenuBtn from "../components/DotsMenuBtn";
import { TapasTwoTone } from "@mui/icons-material";

const Transactions = ({setTotalSales, totalSales}) => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/transactionList/viewTransaction")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, [totalSales]);

  // if(transactions) {
  //   const totalAmount = 0;
  //   totalAmount += totalSales;
  //   setTotalSales(totalAmount)
  // }

  const handleDelete = async (id) => {
    await fetch("http://localhost:3000/transactionList/deleteTransaction/" + id, {
      method: "DELETE",
    });
    const newTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(newTransactions);
  };

  const columns = [
    { field: "id", headerName: "Transaction ID", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "OID", headerName: "OID", width: 150 },
    { field: "customerName", headerName: "Customer Name", width: 150 },
    // { field: "phone", headerName: "Phone#", width: 150 },
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
  const rows = transactions.map((row) => ({
    id: row._id,
    status: row.status,
    oid: row.OID,
    name: row.customerName,
    // phone: row.phone,
    date: row.date,
  }));

  // console.log(products);

  return (
    <Box>
      <Box sx={theme.mixins.toolbar} />
      <Box sx={{ display: "flex" }} mb={3}>
        <Typography sx={{ flexGrow: 1 }} variant="h1">
          Transactions
        </Typography>
        <Button variant="contained">
          Add Transaction
        </Button>
      </Box>

      <div style={{ height: "78vh", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            ...transactions.initialState,
            pagination: { paginationModel: { pageSize: 9 } },
          }}
          pageSizeOptions={[9, 18, 36]}
        />
      </div>
    </Box>
  );
};

export default Transactions;
