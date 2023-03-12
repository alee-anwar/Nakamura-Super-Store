import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Logo from "../../assets/admin-logo.png";
import { format } from "date-fns";
import NotificationBell from "./NotificationBell";
import AccountMenu from "./AccountMenu";

const Appbar = () => {
  const appbarStyles = {
    logo: {
      height: 55,
      paddingLeft: 1,
    },
    date: {
      paddingLeft: 13,
      flexGrow: 1,
    },
  };
  return (
    <AppBar color="inherit" elevation={0} position="fixed">
      <Toolbar>
        <Box
          component="img"
          sx={appbarStyles.logo}
          alt="Admin logo"
          src={Logo}
        />
        <Typography sx={appbarStyles.date} color="textSecondary">
          Today date is {format(new Date(), "do MMMM Y")}
        </Typography>
        <NotificationBell iconColor="primary" badgeContent={4} />
    
        
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
