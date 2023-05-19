import React from "react";
// import { Outlet } from "react-router-dom";
import Appbar from "./Appbar/Appbar";
import Navbar from "./Navbar/Navbar";
import { Box } from "@mui/material";

export default function Layout({ children, user }) {

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar user={user}/>
      <Navbar />
      <Box component="main" mx={5} flexGrow={1} mt={3}>
          {children}
      </Box>
    </Box>
  );
}
