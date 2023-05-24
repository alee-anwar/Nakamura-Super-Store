// import React, { useState, useEffect } from "react";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { BrowserRouter , Routes, Route, Navigate } from "react-router-dom";
// import Layout from "./components/Layout";
// import Dashboard from "./pages/Dashboard";
// import Customers from "./pages/Customers";
// import Orders from "./pages/Orders";
// import Reviews from "./pages/Reviews";
// import Transactions from "./pages/Transactions";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/Signup";
// import CreateProduct from "./pages/Products/CreateProduct";
// import LayoutSign from "./components/LayoutSign";
// import MyAccount from "./pages/MyAccount";
// import Products from "./pages/Products/Products";
// import EditProduct from "./pages/Products/EditProduct";

// const theme = createTheme({
//   typography: {
//     fontFamily: "Nunito",
//     fontWeightLight: 400,
//     fontWeightRegular: 500,
//     fontWeightMedium: 600,
//     fontWeightBold: 700,
//     h1: {
//       fontWeight: 700,
//       letterSpacing: 0.5,
//       fontSize: "1.6rem",
//       textTransform: "capitalize",
//     },
//   },
// });

// function App() {
//   const currentPath = window.location.pathname;
//   const isLoginPage = currentPath === "/login";
//   const isSignupPage = currentPath === "/signup";

//   return (
//     <ThemeProvider theme={theme}>
//       <BrowserRouter>
//         {isLoginPage || isSignupPage ? ( // render the new layout for login and signup pages
//           <LayoutSign>
//             <Routes>
//               <Route path="login" element={<SignIn />} />
//               <Route path="signup" element={<SignUp />} />
//             </Routes>
//           </LayoutSign>
//         ) : (
//         <Layout>
//           <Routes>
//             <Route path="/" element={<Navigate to="dashboard" />} />
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="products" element={<Products />} />
//             <Route path="customers" element={<Customers />} />
//             <Route path="orders" element={<Orders />} />
//             <Route path="reviews" element={<Reviews />} />
//             <Route path="transactions" element={<Transactions />} />
//             <Route path="createproduct" element={<CreateProduct />} />
//             <Route path="myaccount" element={<MyAccount />} />
//             <Route path="editproduct" element={<EditProduct />} />
//           </Routes>
//         </Layout>
//          )}
//       </BrowserRouter>
//     </ThemeProvider>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders/Orders";
import ViewOrder from "./pages/Orders/ViewOrder";
import Reviews from "./pages/Reviews";
import Transactions from "./pages/Transactions";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import CreateProduct from "./pages/Products/CreateProduct";
import LayoutSign from "./components/LayoutSign";
import MyAccount from "./pages/MyAccount";
import Products from "./pages/Products/Products";
import EditProduct from "./pages/Products/EditProduct";

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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState([]);
  // const [totalSales, setTotalSales] = useState('');
  // const [totalOrders, setTotalOrders] = useState('');
  // const [totalProducts, setTotalProducts] = useState('');

  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // setUser(localStorage.getItem("user"));
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
    setIsLoggedIn(token && user); // Set isLoggedIn based on whether the token is present
  }, []);

  console.log("user" + user);
  console.log("account", user[0]?.firstName);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {isLoggedIn ? ( // Render the layout and protected routes if the user is logged in
          <Layout user={user}>
            <Routes>
              <Route path="/" element={<Navigate to="dashboard" />} />
              <Route
                path="dashboard"
                element={
                  <Dashboard
                    user={user}
                    totalSales={totalSales}
                    totalOrders={totalOrders}
                    totalProducts={totalProducts}
                    setTotalOrders={setTotalOrders}
                    setTotalProducts={setTotalProducts}
                    setTotalSales={setTotalSales}
                  />
                }
              />
              <Route path="products" element={<Products setTotalProducts={setTotalProducts} totalSales={totalSales}/>} />
              <Route path="customers" element={<Customers />} />
              <Route path="orders" element={<Orders setTotalOrders={setTotalOrders} totalOrders={totalOrders}/>} />
              <Route path="viewOrder/:orderId" element={<ViewOrder/>} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="transactions" element={<Transactions setTotalSales={setTotalSales} totalSales={totalSales}/>} />
              <Route path="createproduct" element={<CreateProduct />} />
              <Route path="myaccount" element={<MyAccount user={user} />} />
              <Route path="editproduct/:id" element={<EditProduct />} />
            </Routes>
          </Layout>
        ) : (
          <>
            <LayoutSign>
              <Routes>
                <Route path="login" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
              </Routes>
            </LayoutSign>
          </>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
