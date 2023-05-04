import {
  AppBar,
  Badge,
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
import { Link } from "react-router-dom";

const Header = ({ cartItems, wishlist }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

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
          <Link to="/">
            <Box
              component="img"
              sx={{ height: 50 }}
              alt="shop logo"
              src={Logo}
            />
          </Link>
        </Box>
        <SearchBar />
        <Box display="flex" alignItems="center">
          <IconButton disableRipple>
            <Link to="/wishlist">
              <Badge badgeContent={wishlist.length} color="primary">
                <FavoriteBorderRoundedIcon color="primary" />
              </Badge>
            </Link>
          </IconButton>

          <IconButton disableRipple aria-label={notificationsLabel("100")}>
            <Link to="/cart">
              <Badge badgeContent={cartItems.length} color="primary">
                <ShoppingCartRoundedIcon color="primary" />
              </Badge>
            </Link>
          </IconButton>

          <IconButton disableRipple>
            <Link to="/account">
              <Badge color="primary">
                <PersonRoundedIcon color="primary" />
              </Badge>
            </Link>
          </IconButton>
        </Box>
      </Toolbar>
      <Box sx={{ display: { xs: "none", md: "block", background: "#ffffff" } }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-evenly" }}
          color="primary"
        >
          {categories.map((category) => (
            <List disablePadding key={category.id}>
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
            <ListItem key={category.id} onClick={handleDrawerClose}>
              <ListItemText primary={category.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
