import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Reviews from "./pages/Reviews";
import Transactions from "./pages/Transactions";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import CreateProduct from "./pages/Products/CreateProduct";
import LayoutSign from "./components/LayoutSign";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import MyAccount from "./pages/MyAccount";
import Products from "./pages/Products/Products";
import EditProduct from "./pages/Products/EditProduct";
// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import rootReducer from "./reducers";

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
    },
  },
});

// const initialState = {
//   counter: 0,
// };

// function reducer(state = initialState, action) {
//   switch (action.type) {
//     case "INCREMENT":
//       return { ...state, counter: state.counter + 1 };
//     case "DECREMENT":
//       return { ...state, counter: state.counter - 1 };
//     default:
//       return state;
//   }
// }

// const store = createStore(reducer);

function App() {
  const currentPath = window.location.pathname;
  const isLoginPage = currentPath === "/login";
  const isSignupPage = currentPath === "/signup";

  // const store = createStore(reducer, initialState);

  return (
    // <Provider store={store}>
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
                <Route path="myaccount" element={<MyAccount />} />
                <Route path="editproduct" element={<EditProduct />} />
              </Routes>
            </Layout>
          )}
        </BrowserRouter>
      </ThemeProvider>
    // </Provider>
  );
}

export default App;
