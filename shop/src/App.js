import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
// import Layout from "./components/Layout";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Box } from "@mui/material";
import Catalogue from "./pages/Catalogue";
import Wishlist from "./pages/Wishlist";


const theme = createTheme({
  palette: {
    primary: {
      main: "#FFE033",
    },
  },
  typography: {
    h1: {
      fontWeight: 700,
      letterSpacing: 0.5,
      fontSize: "1.7rem",
      textTransform: "capitalize",
      color: "#262626"
    },
  },
});

function App() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const themeSpace = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header cart={cart} wishlist={wishlist}/>
        <Box mt={11.5}/>
          <Routes>
            <Route path="/" element={<Navigate to="home" />} />
            <Route
              path="home"
              element={
                <Home
                  cart={cart}
                  setCart={setCart}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                />
              }
            />
            <Route
              path="catalogue" element={<Catalogue/>}
            />
            <Route
              path="wishlist" element={<Wishlist/>}
            />
            <Route
              path="*"
              element={
                <div>
                  <h1>404 Page Not Found</h1>
                </div>
              }
            />
          </Routes>
        <Footer/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
