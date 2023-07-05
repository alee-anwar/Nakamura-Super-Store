import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import DotsMenuBtn from "../components/DotsMenuBtn";
import axios from "axios";
import moment from "moment";

const Reviews = ({reviews, setReviews, fetchReviews}) => {
  const theme = useTheme();
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
   fetchReviews();
  }, [deleted]);
  console.log("review" + reviews)
  console.log("reviewsID" +reviews[0]._id)

  const handleDelete = async (id) => {
    console.log("ID" + id)
    await axios.delete(`http://localhost:3000/reviewList/deleteReview/${id}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));
    const newReviews = reviews.filter((review) => review._id !== id)
    setReviews(newReviews);
    setDeleted(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "product", headerName: "Product", width: 150 },
    { field: "customer", headerName: "Customer", width: 170 },
    { field: "phone", headerName: "Phone#", width: 140 },
    { field: "rating", headerName: "Rating", width: 80 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "message", headerName: "Message", width: 300 },
    { field: "date", headerName: "Date", width: 100 },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   renderCell: (params) => (
    //     <DotsMenuBtn product={params.id} handleDelete={handleDelete}/>
    //   ),
    //   width: 100,
    // },
  ];
  // const threedots = <MoreHorizRoundedIcon/>;
  const rows = reviews.map((row) => ({
    id: row._id.slice(-7),
    product: row.productName,
    customer: row.customerName,
    phone: row.phoneNumber,
    rating: row.rating,
    title: row.reviewTitle,
    message: row.reviewMessage,
    date: moment(row.date).format("DD/MM/YYYY"),
  })).reverse();
  

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
          // getRowId={(row) => row.date}
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
