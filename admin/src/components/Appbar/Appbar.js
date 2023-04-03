import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
// import { format } from "date-fns";
import NotificationBell from "./NotificationBell";
import AccountMenu from "./AccountMenu";

const drawerWidth = 225;
const useStyles = {
    date: {
      flexGrow: 1,
    },
  };
const Appbar = () => {
  return (
    <AppBar color="inherit" elevation={0} position="fixed" sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
      <Toolbar sx={{justifyContent: 'right'}}>
        {/* <Typography sx={useStyles.date} noWrap component='div' color="textSecondary">
          Today date is {format(new Date(), "do MMMM Y")}
        </Typography> */}
        <NotificationBell iconColor="primary" />
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
