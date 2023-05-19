import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
// import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DotsMenuBtn from "../components/DotsMenuBtn";
import axios from "axios";
import moment from "moment";

const Reviews = () => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [deleted, setDeleted] = useState(false);

  // useEffect(() => {
  //   fetch("http://localhost:3000/reviewList/viewReviews")
  //     .then((res) => res.json())
  //     .then((data) => setReviews(data));
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/reviewList/viewReviews", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err.message));
  }, [deleted]);

  console.log(reviews._id)

  // const handleDelete = async (id) => {
  //   await fetch("http://localhost:3000/reviewList/viewReviews" + id, {
  //     method: "DELETE",
  //   });
  //   const newReviews = reviews.filter((review) => review.id !== id);
  //   setReviews(newReviews);
  // };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/reviewList/viewReviews/${id}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));
    const newReviews = reviews.filter((review) => review._id !== id)
    setReviews(newReviews);
    setDeleted(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "product", headerName: "Product", width: 150 },
    { field: "customer", headerName: "Customer", width: 180 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "rating", headerName: "Rating", width: 100 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "message", headerName: "Message", width: 180 },
    { field: "date", headerName: "Date", width: 100 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <DotsMenuBtn product={params.id} handleDelete={handleDelete}/>
      ),
      width: 100,
    },
  ];
  // const threedots = <MoreHorizRoundedIcon/>;
  const rows = reviews.map((row) => ({
    id: row._id,
    product: row.productName,
    customer: row.customerName,
    email: row.email,
    rating: row.rating,
    title: row.reviewTitle,
    message: row.reviewMessage,
    date: moment(row.date).format("DD/MM/YYYY"),
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
          getRowId={(row) => row.date}
          initialState={{
            ...reviews.initialState,
            pagination: { paginationModel: { pageSize: 9 } },
          }}
          pageSizeOptions={[9, 18, 36]}
        />
      </div>
    </Box>
  );
};

export default Reviews;
