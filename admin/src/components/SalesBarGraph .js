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
              data: [20, 50, 20, 18, 22, 16, 21],
              backgroundColor: "#C4E8C2",
              borderWidth: 0,
            },
            {
              label: "Orders",
              data: [10, 17, 14, 19, 20, 15, 18],
              backgroundColor: "#6BBD99",
              borderWidth: 0,
            },
            {
              label: "Transactions",
              data: [8, 13, 6, 17, 12, 9, 14],
              backgroundColor: "#4A8DB7",
              borderWidth: 0,
            },
            {
              label: "Customers",
              data: [20, 18, 10, 13, 17, 16, 19],
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
              data: [50, 60, 55, 70],
              backgroundColor: "#C4E8C2",
              borderWidth: 0,
            },
            {
              label: "Orders",
              data: [45, 65, 60, 50],
              backgroundColor: "#6BBD99",
              borderWidth: 0,
            },
            {
              label: "Transactions",
              data: [40, 50, 50, 60],
              backgroundColor: "#4A8DB7",
              borderWidth: 0,
            },
            {
              label: "Customers",
              data: [35, 50, 45, 55],
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
                150, 180, 190, 170, 220, 200, 190, 210, 180, 190,
                160, 170,
              ],
              backgroundColor: "#C4E8C2",
              borderWidth: 0,
            },
            {
              label: "Orders",
              data: [
                140, 170, 150, 160, 180, 170, 190, 200, 170, 160,
                150, 180,
              ],
              backgroundColor: "#6BBD99",
              borderWidth: 0,
            },
            {
              label: "Transactions",
              data: [
                130, 150, 170, 180, 100, 170, 150, 190, 160, 150,
                140, 170,
              ],
              backgroundColor: "#4A8DB7",
              borderWidth: 0,
            },
            {
              label: "Customers",
              data: [
                180, 200, 100, 170, 160, 180, 200, 190, 170, 160,
                180, 190,
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
              data: [800, 900, 950, 1000],
              backgroundColor: "#C4E8C2",
              borderWidth: 0,
            },
            {
              label: "Orders",
              data: [750, 850, 800, 900],
              backgroundColor: "#6BBD99",
              borderWidth: 0,
            },
            {
              label: "Transactions",
              data: [700, 800, 850, 900],
              backgroundColor: "#4A8DB7",
              borderWidth: 0,
            },
            {
              label: "Customers",
              data: [900, 950, 900, 950],
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
