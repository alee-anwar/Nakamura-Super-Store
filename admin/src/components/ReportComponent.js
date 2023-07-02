import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box, Container, Grid, Paper } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const ReportComponent = () => {
  const transactionData = {
    labels: ["Success", "Failure"],
    datasets: [
      {
        data: [8, 2],
        backgroundColor: ["#ff9017", "#EAEBED"],
        borderColor: ["#ff9017", "#EAEBED"],
      },
    ],
  };

  const ordersData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [5, 3],
        backgroundColor: ["#00b517", "#EAEBED"],
        borderColor: ["#00b517", "#EAEBED"],
      },
    ],
  };

  const productsData = {
    labels: ["In Stock", "Out of Stock"],
    datasets: [
      {
        data: [7, 1],
        backgroundColor: ["#3167eb", "#EAEBED"],
        borderColor: ["#3167eb", "#EAEBED"],
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
    <Container maxWidth="lg" >
      <Grid container>
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

        <Grid
          item
          sm={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box width={230} height={230}>
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
            <Doughnut data={productsData} options={options} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReportComponent;
