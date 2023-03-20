import React, { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import Appbar from "./components/Appbar/Appbar";
import Appbar from "./Appbar/Appbar";
import Navbar from "./Navbar/Navbar";
import Header from "./Header";
import { useLocation } from "react-router-dom";

const Styles = {
  page: {
    background: "#ffffff",
    width: "100%",
  },
  root: {
    display: "flex",
  },
};

export default function Layout({ children }) {
  const [title, setTitle] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const parsedTitle = location.pathname.replace(/\W/g, " ");
    setTitle(parsedTitle);
  }, [location]);

  return (
    <div style={Styles.root}>
      {/* appbar */}
      <Appbar />
      {/* drawer */}
      <Navbar />\{/* Layout */}
      <div>
        <Header title={title} />
        <div style={Styles.page}>{children}</div>
      </div>
    </div>
  );
}
