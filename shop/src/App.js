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
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import MyAccount from "./pages/MyAccount";
import Checkout from "./pages/Checkout";
import PageNotFound from "./pages/PageNotFound";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFE033",
    },
  },
  typography: {
    h1: {
      fontWeight: 500,
      letterSpacing: 0.5,
      fontSize: "1.7rem",
      textTransform: "capitalize",
      color: "#262626",
    },
  },
});

function App() {
  const [wishlist, setWishlist] = useState([]);
  // const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const themeSpace = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header wishlist={wishlist} cartItems={cartItems} />
        <Box mt={11.5} />
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route
            path="home"
            element={
              <Home
                cartItems={cartItems}
                setCartItems={setCartItems}
                wishlist={wishlist}
                setWishlist={setWishlist}
                setTotalCost={setTotalCost}
              />
            }
          />
          <Route
            path="catalogue"
            element={
              <Catalogue
                // cart={cart}
                // setCart={setCart}
                wishlist={wishlist}
                setWishlist={setWishlist}
                cartItems={cartItems}
                setCartItems={setCartItems}
                totalCost={totalCost}
                setTotalCost={setTotalCost}
              />
            }
          />
          <Route
            path="wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                setWishlist={setWishlist}
                cartItems={cartItems}
                setCartItems={setCartItems}
                totalCost={totalCost}
                setTotalCost={setTotalCost}
              />
            }
          />
          <Route
            path="cart"
            element={
              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
                totalCost={totalCost}
                setTotalCost={setTotalCost}
              />
            }
          />
          <Route
            path="productdetails/:id"
            element={
              <ProductDetails
                cartItems={cartItems}
                setCartItems={setCartItems}
                wishlist={wishlist}
                setWishlist={setWishlist}
                setTotalCost={setTotalCost}
              />
            }
          />
          <Route path="account" element={<MyAccount />} />
          <Route path="checkout" element={<Checkout cartItems={cartItems} totalCost={totalCost}/>} />
          <Route
            path="*"
            element={
              <PageNotFound/>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
