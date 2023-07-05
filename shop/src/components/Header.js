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
import React, { useEffect, useState } from "react";
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
  const [clickedButton, setClickedButton] = useState(null);
  const [pathname, setPathname] = useState(window.location.pathname);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setPathname(window.location.pathname);
    console.log("current", pathname);

    return () => {
      // Reset the clickedButton state on component unmount
      if (!pathname.includes("shop")) {
        setClickedButton(null); // Reset the clickedButton state if currentURL does not include "shop"
      }
    };
  }, [window.location.pathname]);

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
    setClickedButton(value);
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
      <Toolbar sx={{ background: "#ffffff", p: 0 }}>
        <IconButton
          aria-label="menu"
          onClick={handleDrawerOpen}
          sx={{ display: { md: "none" }, pl: {xs: 1, sm:0, md: 0} }}
        >
          <MenuIcon color="primary" />
        </IconButton>
        <Box sx={{ flexGrow: 1, pl: { xs: 0, sm: 1 } }}>
          <Link to="/">
            <Box
              component="img"
              sx={{
                height: {
                  xs: "40px", // Height for extra-small screens
                  sm: "45px",
                  md: "50px", // Height for medium screens and larger
                },
              }}
              alt="shop logo"
              src={Logo}
            />
          </Link>
        </Box>
        <Box
          component="div"
          sx={{
            display: { xs: "none", md: "block" },
            marginRight: 4,
          }}
        >
          <SearchBar />
        </Box>
        <Box display="flex" alignItems="center">
          <Tooltip title={t("Wishlist")}>
            <IconButton disableRipple >
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

          <Box pl={1.5} mr={1}>
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
              <MenuItem onClick={() => handleLanguageChange("en-US")}>
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
                    color={
                      clickedButton === category.value ? "primary" : "neutral"
                    }
                    sx={{
                      textDecoration:
                        clickedButton === category.value ? "underline" : "none",
                    }}
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
        <Box
          component="div"
          sx={{
            display: { xs: "block", md: "none" },
            mx: 2,
            // marginRight: 4,
          }}
        >
          <SearchBar handleDrawerClose={handleDrawerClose} s />
        </Box>
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
