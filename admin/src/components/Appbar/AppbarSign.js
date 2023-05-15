import { AppBar, Box, Button, Toolbar } from "@mui/material";
import React, { useState } from "react";
import Logo from "../../assets/admin-logo.png";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    neutral: {
        main: '#969696',
        contrastText: '#fff',
      },
  },
});

const AppbarSign = () => {
  const navigate = useNavigate();
  const [clickedButton, setClickedButton] = useState("login");

  const handleLoginClick = () => {
    setClickedButton("login");
    navigate("/login");
  };

  const handleSignupClick = () => {
    setClickedButton("signup");
    navigate("/signup");
  };

  return (
    <ThemeProvider theme={theme}>
    <AppBar color="inherit">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Box
            component="img"
            sx={{
              height: 50,
            }}
            alt="Admin logo"
            src={Logo}
          />
        </Box>

        <Button
          onClick={handleLoginClick}
          variant="text"
          // color={clickedButton === "login" ? "primary" : "neutral"}
          color={clickedButton === "login" ? "primary" : "neutral"}
        >
          LogIn
        </Button>
        <Button
          onClick={handleSignupClick}
          variant="text"
          color={clickedButton === "signup" ? "primary" : "neutral"}
        >
          SignUp
        </Button>
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
};

export default AppbarSign;
