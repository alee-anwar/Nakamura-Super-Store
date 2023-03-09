import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Reviews from './pages/Reviews';
import Transactions from './pages/Transactions';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="products" element={<Products/>} />
        <Route path="customers" element={<Customers/>} />
        <Route path="orders" element={<Orders/>} />
        <Route path="reviews" element={<Reviews/>} />
        <Route path="transactions" element={<Transactions/>} />
      </Route>
    </Routes>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
