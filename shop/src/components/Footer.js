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
const Footer = () => {
  return (
    <Box sx={{ height: "auto", background: "#262626", pb: 3, pt: 5, px: 5 }}>
      <Container maxWidth="md" sx={{pb: 3}}>
        <Grid container>
          <Grid item md={4} sm={12} xs={12}>
            <Box sx={{ color: "#fff"}} textAlign='center' pt={1}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }} pb={1}>
                Customer Service
              </Typography>
              <Stack spacing={0.1}>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  My Account
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  FAQs
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  Cash On Delivery
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  Contact Us
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  Store Address
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item md={4} sm={12}  xs={12}>
            <Box sx={{ color: "#fff" }}  textAlign='center' pt={1}> 
              <Typography variant="body1" sx={{ fontWeight: "bold" }} pb={1}>
                Help & Information
              </Typography>
              <Stack spacing={0.1}>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  About Us
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  Shipping & Exchange Policy
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  Terms & Conditions
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  Priviacy Policy
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  Store Address
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item md={4} sm={12}  xs={12}>
            <Box sx={{ color: "#fff" }}  textAlign='center' pt={1}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }} pb={1}>
                Quick Links
              </Typography>
              <Stack spacing={0.1}>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  Home
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  Shop Now
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  Cart
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  Wishlist
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Divider sx={{ bgcolor: '#fff' }} flexItem/>
      <Grid container pt={3}>
        <Grid item md={6} sm={12}  xs={12}>
          <Box
            component="img"
            sx={{ height: 72, justifyContent: "center", alignItems: "center" }}
            alt="footer logo"
            src={Logo}
          />
        </Grid>
        <Grid item md={6} sm={12}  xs={12}>
          <Stack height='100%' alignItems='center' color="#fff" direction="row-reverse" spacing={1} pt={1}>
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
