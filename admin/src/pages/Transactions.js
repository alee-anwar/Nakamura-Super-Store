import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
// import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DotsMenuBtn from "../components/DotsMenuBtn";
import { ConstructionOutlined, TapasTwoTone } from "@mui/icons-material";
import moment from "moment";
import axios from "axios";

const Transactions = ({ setTotalSales, totalSales }) => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/transactionList/viewTransaction")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, [totalSales, deleted]);

  console.log(transactions.status);

  useEffect(() => {
    // Calculate total amount
    const totalAmount = transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    setTotalSales(totalAmount);
    console.log("Amount " + totalAmount);
  }, [transactions, setTotalSales, deleted]);

  // const handleDelete = async (id) => {
  //   await fetch(
  //     "http://localhost:3000/transactionList/deleteTransaction/" + id,
  //     {
  //       method: "DELETE",
  //     }
  //   );
  //   const newTransactions = transactions.filter(
  //     (transaction) => transaction._id !== id
  //   );
  //   setTransactions(newTransactions);
  // };

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:3000/transactionList/deleteTransaction/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
    const newTransactions = transactions.filter(
      (transaction) => transaction._id !== id
    );
    setTransactions(newTransactions);
    setDeleted(true);
  };

  const columns = [
    { field: "id", headerName: "Transaction ID", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "oid", headerName: "OID", width: 150 },
    { field: "customerName", headerName: "Customer Name", width: 200 },
    // { field: "phone", headerName: "Phone#", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <DotsMenuBtn product={params.id} handleDelete={handleDelete} />
      ),
      width: 150,
    },
  ];
  // const threedots = <MoreHorizRoundedIcon/>;
  const rows = transactions.map((row) => ({
    id: row.transactionId,
    amount: row.amount,
    status: row.status,
    oid: row.oid,
    customerName: row.customerName,
    phone: row.phoneNo,
    date: moment(row.date).format("DD/MM/YYYY"),
  }));

  // console.log(products);

  return (
    <Box>
      <Box sx={theme.mixins.toolbar} />
      <Box sx={{ display: "flex" }} mb={3}>
        <Typography sx={{ flexGrow: 1 }} variant="h1">
          Transactions
        </Typography>
        <Button variant="contained">Add Transaction</Button>
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
