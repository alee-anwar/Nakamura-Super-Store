import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SalesGraph = () => {
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Products",
        data: [120, 150, 200, 180, 220, 160, 210],
        backgroundColor: "#C4E8C2",
        borderWidth: 0,
      },
      {
        label: "Orders",
        data: [100, 170, 140, 190, 200, 150, 180],
        backgroundColor: "#6BBD99",
        borderWidth: 0,
      },
      {
        label: "Transactions",
        data: [80, 130, 160, 170, 120, 190, 140],
        backgroundColor: "#4A8DB7",
        borderWidth: 0,
      },
      {
        label: "Customers",
        data: [200, 180, 150, 130, 170, 160, 190],
        backgroundColor: "#78A6C8",
        borderWidth: 0,
      },
    ],
  };

  const [salesData, setSalesData] = useState(data);
  const [activeButton, setActiveButton] = useState("day");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/sales");
//       const data = await response.json();
//       setSalesData(data);
//     } catch (error) {
//       console.error("Failed to fetch sales data:", error);
//     }
//   };

  const handleTimePeriodChange = (timePeriod) => {
    // Fetch and update sales data based on the selected time period
    // Here, we are using static data for demonstration purposes
    let newData = {};

    switch (timePeriod) {
      case "day":
        newData = {
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          datasets: [
            {
              label: "Products",
              data: [120, 150, 200, 180, 220, 160, 210],
              backgroundColor: "#C4E8C2",
              borderWidth: 0,
            },
            {
              label: "Orders",
              data: [100, 170, 140, 190, 200, 150, 180],
              backgroundColor: "#6BBD99",
              borderWidth: 0,
            },
            {
              label: "Transactions",
              data: [80, 130, 160, 170, 120, 190, 140],
              backgroundColor: "#4A8DB7",
              borderWidth: 0,
            },
            {
              label: "Customers",
              data: [200, 180, 150, 130, 170, 160, 190],
              backgroundColor: "#78A6C8",
              borderWidth: 0,
            },
          ],
        };
        break;
      case "week":
        newData = {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          datasets: [
            {
              label: "Products",
              data: [500, 600, 550, 700],
              backgroundColor: "#C4E8C2",
              borderWidth: 0,
            },
            {
              label: "Orders",
              data: [450, 650, 600, 550],
              backgroundColor: "#6BBD99",
              borderWidth: 0,
            },
            {
              label: "Transactions",
              data: [400, 550, 500, 600],
              backgroundColor: "#4A8DB7",
              borderWidth: 0,
            },
            {
              label: "Customers",
              data: [350, 500, 450, 550],
              backgroundColor: "#78A6C8",
              borderWidth: 0,
            },
          ],
        };
        break;
      case "month":
        newData = {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Products",
              data: [
                1500, 1800, 1900, 1700, 2200, 2000, 1900, 2100, 1800, 1900,
                1600, 1700,
              ],
              backgroundColor: "#C4E8C2",
              borderWidth: 0,
            },
            {
              label: "Orders",
              data: [
                1400, 1700, 1500, 1600, 1800, 1700, 1900, 2000, 1700, 1600,
                1500, 1800,
              ],
              backgroundColor: "#6BBD99",
              borderWidth: 0,
            },
            {
              label: "Transactions",
              data: [
                1300, 1500, 1700, 1800, 1600, 1700, 1500, 1900, 1600, 1500,
                1400, 1700,
              ],
              backgroundColor: "#4A8DB7",
              borderWidth: 0,
            },
            {
              label: "Customers",
              data: [
                1800, 2000, 1900, 1700, 1600, 1800, 2000, 1900, 1700, 1600,
                1800, 1900,
              ],
              backgroundColor: "#78A6C8",
              borderWidth: 0,
            },
          ],
        };
        break;

      case "year":
        newData = {
          labels: ["2020", "2021", "2022", "2023"],
          datasets: [
            {
              label: "Products",
              data: [8000, 9000, 9500, 10000],
              backgroundColor: "#C4E8C2",
              borderWidth: 0,
            },
            {
              label: "Orders",
              data: [7500, 8500, 8000, 9000],
              backgroundColor: "#6BBD99",
              borderWidth: 0,
            },
            {
              label: "Transactions",
              data: [7000, 8000, 8500, 9000],
              backgroundColor: "#4A8DB7",
              borderWidth: 0,
            },
            {
              label: "Customers",
              data: [9000, 9500, 9000, 9500],
              backgroundColor: "#78A6C8",
              borderWidth: 0,
            },
          ],
        };
        break;

      default:
        break;
    }

    setSalesData(newData);
    setActiveButton(timePeriod);
  };

  const options = {};

  return (
    <Box py={2}>
      <Typography variant="h6" fontWeight={700} py={1}>
        Sales Report
      </Typography>
      <ButtonGroup variant="outlined" aria-label="time-period-buttons">
        <Button
          variant={activeButton === "day" ? "contained" : "outlined"}
          onClick={() => handleTimePeriodChange("day")}
        >
          Day
        </Button>
        <Button
          variant={activeButton === "week" ? "contained" : "outlined"}
          onClick={() => handleTimePeriodChange("week")}
        >
          Week
        </Button>
        <Button
          variant={activeButton === "month" ? "contained" : "outlined"}
          onClick={() => handleTimePeriodChange("month")}
        >
          Month
        </Button>
        <Button
          variant={activeButton === "year" ? "contained" : "outlined"}
          onClick={() => handleTimePeriodChange("year")}
        >
          Year
        </Button>
      </ButtonGroup>

      <Bar data={salesData} options={options} />
    </Box>
  );
};

export default SalesGraph;
