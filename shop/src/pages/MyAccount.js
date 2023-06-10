import React, { useState } from "react";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MyAccount = ({ cartItems, setIsAuthenticated, isAuthenticated }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/home");
  };

  const user = {
    name: "Pathan",
    address: {
      town: "Example Town",
      street: "123 Example Street",
      houseNo: "5",
    },
    orderHistory: [
      {
        id: 1,
        date: "2023-05-01",
        product: "Example Product 1",
      },
      {
        id: 2,
        date: "2023-05-05",
        product: "Example Product 2",
      },
      // Add more order history entries if needed
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <BreadcrumbsComponent name={t("Account")} path={"/account"} />
      <Typography variant="h1" my={2}>
        {t('Account')}
      </Typography>
      <Grid container>
        <Grid item md={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "40vh",
              pb: 20,
            }}
          >
            <TextField
              label={t("Name")}
              value={user.name}
              disabled
              sx={{ mb: 2 }}
              size="small"
            />
            <TextField
              label={t("Town")}
              value={user.address.town}
              disabled
              sx={{ mb: 2 }}
              size="small"
            />
            <TextField
              label={t("Street")}
              value={user.address.street}
              disabled
              sx={{ mb: 2 }}
              size="small"
            />
            <TextField
              label={t("House No")}
              value={user.address.houseNo}
              disabled
              sx={{ mb: 2 }}
              size="small"
            />
          </Box>
        </Grid>
        <Grid item md={2}>
          <Divider orientation="vertical" flexItem />
        </Grid>
        <Grid item md={5}>
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
                <>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                  >
                    {t('Welcome back! You are already logged in.')}
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={handleLogout}
                  >
                    {t('Logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="body1" color="textSecondary">
                    {t('Please login to view user information.')}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ my: 1 }}
                    onClick={() => navigate("/account/login")}
                  >
                    {t('Login')}
                  </Button>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                  >
                    {t('If you are a new user, you will be redirected to the signup page after verification.')}
                  </Typography>
                </>
              )}
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyAccount;
