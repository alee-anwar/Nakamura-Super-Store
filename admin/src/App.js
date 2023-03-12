import * as React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Grid from "@mui/material/Grid";
import Appbar from "./components/Appbar/Appbar";

export default function App() {
  return (
    <Grid container>
      <Appbar />
      <Navbar />
      <Outlet />
    </Grid>
  );
}
