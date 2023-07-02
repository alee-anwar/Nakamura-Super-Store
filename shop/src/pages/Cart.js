import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import CartItem from "../components/CartItem";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import { Link, useNavigate } from "react-router-dom";
import EmptyMessage from "../components/EmptyMessage";
import { useTranslation } from "react-i18next";

const Cart = ({
  cartItems,
  setCartItems,
  totalCost,
  setTotalCost,
  quantity,
  setQuantity,
  availableStock,
  setAvailableStock,
  productQuantities,
  setProductQuantities,
}) => {
  console.log("Welcome to Cart Page");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const { t } = useTranslation();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCheckout = () => {
    // Pass the message and shipping method data to the /checkout page
    navigate("/checkout", {
      state: {
        message: message,
        shippingMethod: selectedOption,
      },
    });
  };

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    const savedTotalCost = JSON.parse(localStorage.getItem("totalCost"));
    if (savedCartItems) {
      setCartItems(savedCartItems);
      setTotalCost(savedTotalCost);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalCost", JSON.stringify(totalCost));
  }, [cartItems, totalCost]);

  return (
    <Container maxWidth="lg" sx={{ pt: 5 }}>
      <BreadcrumbsComponent name={t("Cart")} path={"/cart"} />
      <Box display="flex" alignItems="center">
        <Typography variant="h1" my={2} flexGrow={1}>
          {t('Cart')}
        </Typography>
        <Link to="#" onClick={handleGoBack} style={{ color: "#ffb800" }}>
          {t('Go Back')}
        </Link>
      </Box>
      <Grid container>
        {cartItems.length === 0 ? (
          <Grid item xs={12} md={12}>
            <EmptyMessage
              path={"/shop"}
              errorMessage={t("Your cart is empty")}
              linkMsg={t("Return to shopping")}
            />
          </Grid>
        ) : (
          <>
            <Grid item xs={12} md={8} pb={2}>
              <Stack spacing={1} pr={2}>
                {cartItems.map((item) => (
                  <Paper variant="outlined" elevation={2}>
                    <CartItem
                      key={item.id}
                      item={item}
                      // handleRemoveItem={handleRemoveItem}
                      quantity={quantity}
                      setQuantity={setQuantity}
                      availableStock={availableStock}
                      setAvailableStock={setAvailableStock}
                      productQuantities={productQuantities}
                      setProductQuantities={setProductQuantities}
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                      setTotalCost={setTotalCost}
                    />
                  </Paper>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={4} pb={2}>
              <Paper variant="outlined" sx={{ p: 1 }}>
                <Typography textAlign="center" variant="h6" py={0}>
                  {t('Order Summary')}
                </Typography>
                <Divider />
                <Box
                  py={1.5}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" fontWeight={600}>
                    {t('Total')}
                  </Typography>
                  <Typography variant="body1">
                    AFN {totalCost?.toFixed(2)}
                  </Typography>
                </Box>

                <Divider />

                <Box py={2}>
                  <Typography variant="body2" fontWeight={600}>
                    {t('Additional Message')}
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                </Box>

                <Divider />

                <Box py={2}>
                  <Typography variant="body2" fontWeight={600}>
                    {t('Shipping Method')} *
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="delivery-option"
                      name="delivery-option"
                      value={selectedOption}
                      onChange={handleOptionChange}
                    >
                      <FormControlLabel
                        value="Store Pickup"
                        control={
                          <Radio
                            color="primary"
                            size="small"
                            sx={{ marginRight: 0 }}
                          />
                        }
                        label={
                          <Typography
                            component="div"
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <div>{t('Store Pickup')}</div>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#EE0300",
                                marginLeft: 1,
                                fontWeight: 600,
                              }}
                            >
                              {t('Free')}
                            </Typography>
                          </Typography>
                        }
                        disableTypography
                        sx={{ marginBottom: "-10px" }}
                      />
                      <FormControlLabel
                        value="Home Delivery"
                        control={
                          <Radio
                            color="primary"
                            size="small"
                            sx={{ marginRight: 0 }}
                          />
                        }
                        label={t("Home Delivery")}
                        disableTypography
                        sx={{ marginBottom: "-10px" }}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Divider />

                {/* Checkout Button */}
                <Box py={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    display="flex"
                    justifyContent="center"
                    fullWidth
                    onClick={handleCheckout}
                    disabled={!selectedOption} // Disable button if selectedOption is empty or null
                  >
                    {t('Checkout')}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Cart;
