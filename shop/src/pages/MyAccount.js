import React, { useState } from "react";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const MyAccount = ({cartItems, setIsAuthenticated}) => {
  const [showSmsVerification, setShowSmsVerification] = useState(false);
  const [showPhoneNoInput, setShowPhoneNoInput] = useState(true);
  const navigate = useNavigate();

  const handleVerifyClick = () => {
    // Perform verification process and set isAuthenticated to true upon success
    setIsAuthenticated(true);
    {cartItems.length > 0 ? navigate("/checkout") : navigate("/home");}
    
  };

  const handleSmsVerification = () => {
    setShowSmsVerification(true);
    setShowPhoneNoInput(false);
  };

  const handlePhoneNoInput = () => {
    setShowPhoneNoInput(false);
  };
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <BreadcrumbsComponent name={"MyAccount"} path={"/account"} />
      <Typography variant="h1" my={2}>
        Account
      </Typography>
      <Container maxWidth="sm">
        {showPhoneNoInput && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "30vh",
              pb: 20,
            }}
          >
            <Typography variant="h6" color="textSecondary">
              Hi, WE need your phone number to verify your identity
            </Typography>
            <TextField />
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              onClick={handleSmsVerification}
            >
              Use SMS
            </Button>
            <Button variant="contained" sx={{ mt: 1 }}>
              Use Call
            </Button>
          </Box>
        )}

        {showSmsVerification && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "30vh",
              pb: 20,
            }}
          >
            <Typography variant="h6" color="textSecondary" mb={2}>
              Enter the code sent to your phone
            </Typography>
            <TextField />
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              onClick={handleVerifyClick}
            >
              Verify
            </Button>
          </Box>
        )}
      </Container>
    </Container>
  );
};

export default MyAccount;
