import React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { mainNavbarItems } from "./navbarItems";
import { useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Logo from "../../assets/admin-logo.png";
import { Box } from "@mui/material";

const drawerWidth = 256;
const useStyles = makeStyles((theme) => {
  return {
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      ".MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
      },
    },
    icons: {
      marginLeft: "20px",
    },
    text: {
      marginLeft: "-10px",
      fontWeight: "300",
      fontSize: "16px",
    },
    listItem: {
      paddingLeft: "0px",
      paddingRight: "0px",
    },
    active: {
      background: "#f4f4f4",
    },
    logo: {
      height: 50,
      justifyContent: "center",
    },
  };
});

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <Drawer className={classes.drawer} variant="permanent" anchor="left">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Box
            component="img"
            className={classes.logo}
            alt="Admin logo"
            src={Logo}
          />
        </Toolbar>
        <Divider />
        <List>
          {mainNavbarItems.map((item) => (
            <ListItem
              key={item.id}
              className={
                (classes.listItem,
                location.pathname === item.path ? classes.active : null)
              }
            >
              <ListItemButton onClick={() => navigate(item.route)}>
                <ListItemIcon className={classes.icons}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText className={classes.text} primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
