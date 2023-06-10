import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Logo from "../assets/nakamura footer.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ height: "auto", background: "#262626", pb: 3, pt: 5, px: 5 }}>
      <Container maxWidth="md" sx={{ pb: 3 }}>
        <Grid container>
          <Grid item md={4} sm={12} xs={12}>
            <Box sx={{ color: "#fff" }} textAlign="center" pt={1}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }} pb={1}>
                {t('Customer Service')}
              </Typography>
              <Stack spacing={0.5}>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  {t('My Account')}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  {t('FAQs')}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  {t('Cash On Delivery')}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  {t('Contact Us')}
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <Box sx={{ color: "#fff" }} textAlign="center" pt={1}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }} pb={1}>
                {t('Help & Information')}
              </Typography>
              <Stack spacing={0.5}>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  {t('About Us')}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  {t('Shipping & Exchange Policy')}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  {t('Terms & Conditions')}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  {t('Privacy Policy')}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  {t('Store Address')}
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <Box sx={{ color: "#fff" }} textAlign="center" pt={1}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }} pb={1}>
                {t('Quick Links')}
              </Typography>
              <Stack spacing={0.5}>
                <Link
                  to="/home"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography variant="body2" sx={{ fontSize: 13 }}>
                    {t('Home')}
                  </Typography>
                </Link>
                <Link
                  to="/shop"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography variant="body2" sx={{ fontSize: 13 }}>
                    {t('Shop Now')}
                  </Typography>
                </Link>
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography variant="body2" sx={{ fontSize: 13 }}>
                    {t('Cart')}
                  </Typography>
                </Link>
                <Link
                  to="/wishlist"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography variant="body2" sx={{ fontSize: 13 }}>
                    {t('Wishlist')}
                  </Typography>
                </Link>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Divider sx={{ bgcolor: "#fff" }} flexItem />
      <Grid container pt={3}>
        <Grid item md={6} sm={6} xs={12}>
          <Box
            component="img"
            sx={{ height: 72, justifyContent: "center", alignItems: "center" }}
            alt="footer logo"
            src={Logo}
          />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Stack
            height="100%"
            alignItems="center"
            color="#fff"
            direction="row-reverse"
            spacing={1}
            pt={1}
          >
            <PinterestIcon />
            <InstagramIcon />
            <FacebookIcon />
            <WhatsAppIcon />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
