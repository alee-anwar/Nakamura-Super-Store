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
import { useNavigate } from "react-router-dom";


const drawerWidth = 256;
const Navbar = () => {
  const navigate = useNavigate();
  const navbarStyles = {
    drawer: {
      width: drawerWidth,
      ".MuiDrawer-paper": {
        width: drawerWidth,
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
  };
  return (
    <div>
      <Drawer sx={navbarStyles.drawer} variant="permanent" anchor="left">
        <Toolbar />
        <Divider />
        <List>
          {mainNavbarItems.map((item) => (
            <ListItem key={item.id} sx={navbarStyles.listItem}>
              <ListItemButton onClick={() => navigate(item.route)}>
                <ListItemIcon sx={navbarStyles.icons}>{item.icon}</ListItemIcon>
                <ListItemText sx={navbarStyles.text} primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;

