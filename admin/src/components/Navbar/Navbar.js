import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Logo from "../../assets/admin-logo.png";
import { Box } from "@mui/material";

import { mainNavbarItems } from "./navbarItems";

const drawerWidth = 224;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
  icons: {
    marginLeft: theme.spacing(6)
  },
  text: {
    marginLeft: -15,
    fontWeight: 300,
    fontSize: 16,
  },
  active: {
    background: "#eaeffd",
    color: theme.palette.primary.main,
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
  },
  logo: {
    height: 50,
    justifyContent: "center",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);

  // const handleListItemClick = (route) => {
  //   navigate(route);
  // };
  const handleClick = (item) => {
    setSelectedItem(item.id);
    navigate(item.route);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
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
            sx={{ p: 0}}
            onClick={() => handleClick(item)}
            className={item.id === selectedItem ? classes.active : null}
          >
            <ListItemButton sx={{ px: 0, py: 1.5}}>
              <ListItemIcon className={classes.icons}>{item.icon}</ListItemIcon>
              <ListItemText className={classes.text} primary={item.label} />
              </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Navbar;
