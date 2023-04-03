import React from "react";
// import { Outlet } from "react-router-dom";
// import Appbar from "./components/Appbar/Appbar";
import Appbar from "./Appbar/Appbar";
import Navbar from "./Navbar/Navbar";
// import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

export default function Layout({ children }) {
  // const [title, setTitle] = useState(null);
  // const location = useLocation();

  // useEffect(() => {
  //   const parsedTitle = location.pathname.replace(/\W/g, " ");
  //   setTitle(parsedTitle);
  // }, [location]);

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar />
      <Navbar />
      <Box component="main" mx={5} flexGrow={1} mt={3}>
          {children}
      </Box>
    </Box>
  );
}
