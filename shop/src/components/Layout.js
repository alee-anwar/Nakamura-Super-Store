import { Box, Container } from "@mui/material";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Layout = ({ children }) => {
  const theme = useTheme();
  return (
    <>
      <Header />
      <Box mt={12} />
      <Box component="main">{children}</Box>
      <Footer />
    </>
  );
};

export default Layout;
