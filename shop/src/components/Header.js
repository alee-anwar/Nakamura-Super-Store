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
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import Logo from "../assets/nakamura.png";
import { categories } from "./reuseableComponents/allCategories";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
// import i18n from "../Language/i18n"; // Import the i18n configuration file you created
import { Button, Menu, MenuItem } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const Header = ({ cartItems, wishlist }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLanguageMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleCategoryClick = (value) => {
    navigate(`/shop/${value}`);
  };

  const handleLanguageChange = (language) => {
    i18next.changeLanguage(language);
    handleLanguageMenuClose();
    setIsDrawerOpen(false);
    console.log("language: " + language);
    console.log("languagei18next: " + i18next.language);
    // window.location.reload()
  };

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
    <AppBar elevation={1} sx={{ background: "#ffffff" }}>
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
        <Box marginRight={4}>
          <SearchBar />
        </Box>
        <Box display="flex" alignItems="center">
          <Tooltip title={t("Wishlist")}>
            <IconButton disableRipple>
              <Link to="/wishlist">
                <Badge badgeContent={wishlist.length} color="primary">
                  <FavoriteBorderRoundedIcon color="primary" />
                </Badge>
              </Link>
            </IconButton>
          </Tooltip>
          <Tooltip title={t("Cart")}>

          <IconButton disableRipple aria-label={notificationsLabel("100")}>
            <Link to="/cart">
              <Badge badgeContent={cartItems.length} color="primary">
                <ShoppingCartRoundedIcon color="primary" />
              </Badge>
            </Link>
          </IconButton>
          </Tooltip>
          <Tooltip title={t("Account")}>
          <IconButton disableRipple>
            <Link to="/account">
              <Badge color="primary">
                <PersonRoundedIcon color="primary" />
              </Badge>
            </Link>
          </IconButton>
          </Tooltip>

          <Box pl={1.5}>
            <Button
              color="inherit"
              endIcon={menuOpen ? <ArrowDropUp /> : <ArrowDropDown />}
              onClick={handleLanguageMenuOpen}
              variant="outlined"
              sx={{ p: 0 }}
            >
              {i18next.language === "ps" ? "پښتو" : "Eng"}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleLanguageMenuClose}
            >
              <MenuItem onClick={() => handleLanguageChange("en")}>
                Eng
              </MenuItem>
              <MenuItem onClick={() => handleLanguageChange("ps")}>
                پښتو
              </MenuItem>
            </Menu>
          </Box>
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
                sx={{
                  paddingTop: 0,
                  "&:hover": {
                    color: "#ffe033",
                    textDecoration: "underline",
                    bgcolor: "transparent", // Remove the background color on hover
                  },
                }}
                onClick={() => handleCategoryClick(category.value)}
              >
                <ListItem disablePadding>
                  <Typography
                    variant={i18next.language === "ps" ? "body1" : "body2"}
                  >
                    {t(category.label)}
                  </Typography>
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
              <ListItemButton
                onClick={() => handleCategoryClick(category.value)}
              >
                <ListItemText primary={t(category.label)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
