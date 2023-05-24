import React, { useState } from "react";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const MyAccount = ({ cartItems, setIsAuthenticated, isAuthenticated }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/home")
  }
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <BreadcrumbsComponent name={"Account"} path={"/account"} />
      <Typography variant="h1" my={2}>
        Account
      </Typography>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "40vh",
            pb: 20,
          }}
        >
          {isAuthenticated == true ? (
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              onClick={() => navigate("/account/login")}
            >
              Login
            </Button>
          )}
        </Box>
      </Container>
    </Container>
  );
};

export default MyAccount;
