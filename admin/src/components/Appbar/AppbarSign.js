import { AppBar, Box, Button, Toolbar } from "@mui/material";
import React from "react";
import Logo from "../../assets/admin-logo.png";
import { useNavigate } from "react-router-dom";

const AppbarSign = () => {
    const navigate = useNavigate();
  return (
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

        <Button onClick={() => navigate('/login')}>LogIn</Button>
        <Button onClick={() => navigate('/signup')}>SignUp</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppbarSign;
