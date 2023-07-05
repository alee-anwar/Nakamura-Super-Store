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
import AuthLayout from "./components/AuthLayout";
import MyAccount from "./pages/MyAccount";
import Products from "./pages/Products/Products";
import EditProduct from "./pages/Products/EditProduct";
import axios from "axios";

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

  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [inStockProducts, setInStockProducts] = useState([]);

  const [completedOrders, setCompletedOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [rejectedOrders, setRejectedOrders] = useState([]);

  const [positiveReviews, setPositiveReviews] = useState([]);
  const [negativeReviews, setNegativeReviews] = useState([]);

  // Declare the method and implementing its functionality
  const fetchProducts = () => {
    // const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/productList/viewProducts", {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `bearer ${token}`
          // Authorization: token
        },
      })
      .then((res) => {
        setProducts(res.data);
        setTotalProducts(res.data.length);

        const outOfStockProducts = products.filter(
          (product) => product.stock <= 0
        );
        const inStockProducts = products.filter((product) => product.stock > 0);
        setOutOfStockProducts(outOfStockProducts);
        setInStockProducts(inStockProducts);

        const totalOutOfStockProducts = outOfStockProducts.length;
        const totalInStockProducts = inStockProducts.length;

        console.log("Total Out of Stock Products:", totalOutOfStockProducts);
        console.log("Total In Stock Products:", totalInStockProducts);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the App component mounts
  }, [totalProducts]);

  // const fetchOrders = () => {
  //   axios
  //     .get("http://localhost:3000/orderList/viewOrders", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         // Authorization: `bearer ${token}`
  //         // Authorization: token
  //       },
  //     })
  //     .then((res) => {
  //       setOrders(res.data);
  //       setTotalOrders(res.data.length);
  //     })
  //     .catch((error) => console.log(error.message));
  // };

  const fetchOrders = () => {
    axios
      .get("http://localhost:3000/orderList/viewOrders", {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `bearer ${token}`
          // Authorization: token
        },
      })
      .then((res) => {
        const orders = res.data;
        setOrders(orders);
        setTotalOrders(orders.length);

        const completedOrders = orders.filter(
          (order) => order.status === "Delivered"
        );
        const pendingOrders = orders.filter(
          (order) => order.status === "Pending"
        );
        const rejectedOrders = orders.filter(
          (order) => order.status === "Cancelled"
        );

        setCompletedOrders(completedOrders);
        setPendingOrders(pendingOrders);
        setRejectedOrders(rejectedOrders);

        const totalCompletedOrders = completedOrders.length;
        const totalPendingOrders = pendingOrders.length;
        const totalRejectedOrders = rejectedOrders.length;

        console.log("Total Delivered Orders:", totalCompletedOrders);
        console.log("Total Pending Orders:", totalPendingOrders);
        console.log("Total Cancelled Orders:", totalRejectedOrders);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetchOrders();
  }, [totalOrders]);

  const fetchSales = () => {
    axios
      .get("http://localhost:3000/transactionList/viewTransaction")
      .then((res) => {
        const data = res.data;
        setTransactions(data);

        // Calculate total amount
        const totalAmount = data.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        );
        setTotalSales(totalAmount);
        console.log("Amount: " + totalAmount);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetchSales();
  }, [totalSales]);

  const fetchReviews = () => {
    axios
      .get("http://localhost:3000/reviewList/viewReviews", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const reviews = res.data;
        setReviews(reviews);
        setTotalReviews(reviews.length)

        const positiveReviews = reviews.filter((review) => review.rating >= 3);
        const negativeReviews = reviews.filter((review) => review.rating < 3);

        setPositiveReviews(positiveReviews);
        setNegativeReviews(negativeReviews);

        console.log("Positive Reviews:", positiveReviews);
        console.log("Negative Reviews:", negativeReviews);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    fetchReviews();
  }, [totalSales]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      // console.log("user" + user);
      // console.log("userpasrse" + parsedUser);
      setUser(parsedUser);
    }
    setIsLoggedIn(token && user); // Set isLoggedIn based on whether the token is present
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {isLoggedIn ? ( // Render the layout and protected routes if the user is logged in
          <Layout user={user}>
            <Routes>
              <Route
                path="/"
                element={<Navigate to={isLoggedIn ? "dashboard" : "login"} />}
              />
              <Route
                path="dashboard"
                element={
                  <Dashboard
                    user={user}
                    totalSales={totalSales}
                    totalOrders={totalOrders}
                    totalProducts={totalProducts}
                    totalReviews={totalReviews}
                    setTotalOrders={setTotalOrders}
                    setTotalProducts={setTotalProducts}
                    setTotalSales={setTotalSales}
                    fetchProducts={fetchProducts}
                    fetchOrders={fetchOrders}
                    completedOrders={completedOrders}
                    pendingOrders={pendingOrders}
                    rejectedOrders={rejectedOrders}
                    inStockProducts={inStockProducts}
                    outOfStockProducts={outOfStockProducts}
                    positiveReviews={positiveReviews}
                    negativeReviews={negativeReviews}
                  />
                }
              />
              <Route
                path="/products"
                element={
                  <Products
                    setTotalProducts={setTotalProducts}
                    totalSales={totalSales}
                    fetchProducts={fetchProducts}
                    products={products}
                    setProducts={setProducts}
                  />
                }
              />
              <Route path="customers" element={<Customers />} />
              <Route
                path="orders"
                element={
                  <Orders
                    setTotalOrders={setTotalOrders}
                    totalOrders={totalOrders}
                    fetchOrders={fetchOrders}
                    orders={orders}
                    setOrders={setOrders}
                  />
                }
              />
              <Route path="viewOrder/:orderId" element={<ViewOrder />} />
              <Route
                path="reviews"
                element={
                  <Reviews
                    reviews={reviews}
                    setReviews={setReviews}
                    fetchReviews={fetchReviews}
                  />
                }
              />
              <Route
                path="transactions"
                element={
                  <Transactions
                    setTotalSales={setTotalSales}
                    totalSales={totalSales}
                    fetchSales={fetchSales}
                    transactions={transactions}
                    setTransactions={setTransactions}
                  />
                }
              />
              <Route path="createproduct" element={<CreateProduct />} />
              <Route path="myaccount" element={<MyAccount user={user} />} />
              <Route path="editproduct/:id" element={<EditProduct />} />
            </Routes>
          </Layout>
        ) : (
          <>
            <AuthLayout>
              <Routes>
                {/* <Route path="/" element={<Navigate to="/login" />} /> */}
                {/* <Route
                  path="/"
                  element={<Navigate to={isLoggedIn ? "dashboard" : "login"} />}
                /> */}
                <Route path="login" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
              </Routes>
            </AuthLayout>
          </>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
