import React from "react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Reviews from "./pages/Reviews";
import Transactions from "./pages/Transactions";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import CreateProduct from "./pages/CreateProduct";
import LayoutSign from "./components/LayoutSign";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LayoutContainer from "./components/LayoutContainer";
const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      letterSpacing: 0.5,
      fontSize: "1.6rem",
      textTransform: "capitalize",
    }
  },
});
function App() {
  // const navigate = useNavigate();

  const currentPath = window.location.pathname;
  const isLoginPage = currentPath === "/login";
  const isSignupPage = currentPath === "/signup";

  // const handleLogin = () => {
  //   navigate("/dashboard");
  // };

  // const handleSignup = () => {
  //   navigate("/dashboard");
  // };

  return (
    // <ThemeProvider theme={theme}>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<LayoutContainer />}>
    //         <Route element={<LayoutSign />}>
    //           <Route path="login" element={<SignIn />} />
    //           <Route path="signup" element={<SignUp />} />
    //         </Route>
    //         <Route element={<Layout />}>
    //           <Route path="/" element={<Navigate to="dashboard" />} />
    //           <Route path="dashboard" element={<Dashboard />} />
    //           <Route path="products" element={<Products />} />
    //           <Route path="customers" element={<Customers />} />
    //           <Route path="orders" element={<Orders />} />
    //           <Route path="reviews" element={<Reviews />} />
    //           <Route path="transactions" element={<Transactions />} />
    //           <Route path="createproduct" element={<CreateProduct />} />
    //         </Route>
    //       </Route>
    //     </Routes>
    //   </BrowserRouter>
    // </ThemeProvider>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {isLoginPage || isSignupPage ? ( // render the new layout for login and signup pages
          <LayoutSign>
            <Routes>
              <Route path="login" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
            </Routes>
          </LayoutSign>
        ) : (
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="customers" element={<Customers />} />
              <Route path="orders" element={<Orders />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="createproduct" element={<CreateProduct />} />
            </Routes>
          </Layout>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
