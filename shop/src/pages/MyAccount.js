import React from "react";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MyAccount = ({ cartItems, setIsAuthenticated, isAuthenticated }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/account");
  };

   // Retrieve userInfo from local storage
   const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // setIsAuthenticated(true);
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Breadcrumbs component */}
      <BreadcrumbsComponent name={t("Account")} path={"/account"} />

      {/* Heading */}
      <Typography variant="h1" my={2}>
        {t("Account")}
      </Typography>

      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            mb: 15,
          }}
        >
          {isAuthenticated ? (
            <Grid container>
              <Grid item md={6} display="flex">
                <Stack mr={15} flexGrow={1}>
                  <TextField
                    label={t("Name")}
                    value={userInfo.firstName}
                    disabled
                    sx={{ mb: 2 }}
                    size="small"
                  />
                  <TextField
                    label={t("Town")}
                    value={userInfo.town}
                    disabled
                    sx={{ mb: 2 }}
                    size="small"
                  />
                  <TextField
                    label={t("Street")}
                    value={userInfo.streetNo}
                    disabled
                    sx={{ mb: 2 }}
                    size="small"
                  />
                  <TextField
                    label={t("House No")}
                    value={userInfo.houseNo}
                    disabled
                    sx={{ mb: 2 }}
                    size="small"
                  />
                </Stack>
                <Divider
                  orientation="vertical"
                  flexItem
                  variant="middle"
                  // sx={{ bgcolor: "#bdbdbd" }}

                />
              </Grid>
              <Grid
                item
                md={6}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Stack pb={5}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                  >
                    {t("Welcome back! You are already logged in.")}
                  </Typography>
                  <Box display="flex" justifyContent="center">
                    <Button
                      variant="contained"
                      sx={{ mt: 1 }}
                      onClick={handleLogout}
                    >
                      {t("Logout")}
                    </Button>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          ) : (
            <>
              <Typography variant="body1" color="textSecondary" align="center">
                {t("Please login to view user information.")}
              </Typography>
              <Box display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  sx={{ my: 1 }}
                  onClick={() => navigate("/account/login")}
                >
                  {t("Login")}
                </Button>
              </Box>
              <Typography variant="body1" color="textSecondary" align="center">
                {t(
                  "If you are a new user, you will be redirected to the signup page after verification."
                )}
              </Typography>
            </>
          )}
        </Box>
      </Container>
    </Container>
  );
};

export default MyAccount;
