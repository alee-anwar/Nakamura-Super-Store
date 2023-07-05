import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box, Container, Grid, Paper } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const ReportComponent = ({
  completedOrders,
  pendingOrders,
  rejectedOrders,
  inStockProducts,
  outOfStockProducts,
  positiveReviews,
  negativeReviews,
}) => {
  const transactionData = {
    labels: ["Positive", "Negative"],
    datasets: [
      {
        data: [positiveReviews.length, negativeReviews.length],
        backgroundColor: ["#ff9017", "#fff"],
        borderColor: ["#ff9017", "#fff"],
      },
    ],
  };

  const ordersData = {
    labels: ["Completed", "Pending", "Cancelled"],
    datasets: [
      {
        data: [
          completedOrders.length,
          pendingOrders.length,
          rejectedOrders.length,
        ],
        backgroundColor: ["#00b517", "#fff", "#c4e8c2"],
        borderColor: ["#00b517", "#fff", "#c4e8c2"],
      },
    ],
  };

  const productsData = {
    labels: ["In Stock", "Out of Stock"],
    datasets: [
      {
        data: [inStockProducts.length, outOfStockProducts.length],
        backgroundColor: ["#3167eb", "#fff"],
        borderColor: ["#3167eb", "#fff"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        // align: "end",
        labels: {
          font: {
            size: 10, // Adjust the font size for the legend
          },
        },
        pointStyle: "square",
        pointRadius: 6, // Adjust the size of the legend marker as per your requirement
      },
    },
  };

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid
          item
          sm={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box width={230} height={230}>
            <Doughnut data={productsData} options={options} />
          </Box>
        </Grid>

        <Grid
          item
          sm={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box width={245} height={245} pt={1.5}>
            <Doughnut data={ordersData} options={options} />
          </Box>
        </Grid>

        <Grid
          item
          sm={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box width={230} height={230}>
            <Doughnut data={transactionData} options={options} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReportComponent;
