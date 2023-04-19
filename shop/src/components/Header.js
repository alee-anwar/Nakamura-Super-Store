import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import Logo from "../assets/nakamura.png";
import { categories } from "./allCategories";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

// import { makeStyles } from "@mui/styles";


// const categories = [
//   "Groceries",
//   "Household items",
//   "Pet supplies",
//   "Health & wellness",
//   "Electronics",
//   "Office & school supplies",
//   "Clothing & accessories",
//   "Kitchen & dining",
//   "Automotive",
//   "Home decor",
// ];

// const useStyles = makeStyles((theme) => ({
//   active: {
//     background: "#eaeffd",
//     color: theme.palette.primary.main,
//     "& .MuiListItemIcon-root": {
//       color: theme.palette.primary.main,
//     },
//   }
// }));
const Header = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  // const handleClick = (item) => {
  //   setSelectedItem(item.id);
  //   navigate(item.route);
  // };

  return (
    <AppBar elevation={1}>
      <Toolbar sx={{ background: "#ffffff" }}>
        <IconButton
          aria-label="menu"
          onClick={handleDrawerOpen}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon color="primary" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Box component="img" sx={{ height: 50 }} alt="shop logo" src={Logo} />
        </Box>
        <SearchBar/>
        <Box>
          <IconButton disableRipple>
            <FavoriteBorderRoundedIcon color="primary" />
          </IconButton>
          <IconButton disableRipple>
            <ShoppingCartRoundedIcon color="primary" />
          </IconButton>
          <IconButton disableRipple>
            <PersonRoundedIcon color="primary" />
          </IconButton>
        </Box>
      </Toolbar>
      <Box sx={{ display: { xs: "none", md: "block", background: "#ffffff" } }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-evenly" }}
          color="primary"
        >
          {categories.map((category) => (
            <List disablePadding>
              <ListItemButton
                disableRipple
                disableGutters
                sx={{ paddingTop: 0 }}
              >
                <ListItem disablePadding>
                  <Typography variant="body2">{category.label}</Typography>
                </ListItem>
              </ListItemButton>
            </List>
          ))}
        </Box>
      </Box>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        sx={{ width: 200 }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography
            variant="h6"
            sx={{ letterSpacing: 2, fontWeight: "bold" }}
          >
            Categories
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              onClick={handleDrawerClose}
              // className={item.id === selectedItem ? classes.active : null}
            >
              <ListItemText primary={category.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
