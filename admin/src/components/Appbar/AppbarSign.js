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

        {/* <Button onClick={() => navigate('/login')}>Log In</Button>
        <Button onClick={() => navigate('/signup')}>Sign Up</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default AppbarSign;
