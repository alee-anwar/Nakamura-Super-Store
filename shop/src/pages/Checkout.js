import React, { useEffect, useState } from "react";
import {
  Container,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";

import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import ErrorMessage from "../components/ErrorMessage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CheckoutItem from "../components/CheckoutItem";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";

function Checkout({
  cartItems,
  totalCost,
  isAuthenticated,
  productQuantities,
}) {
  const [deliveryDate, setDeliveryDate] = React.useState("Same Day Delivery");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message ?? "";
  const shippingMethod = location.state?.shippingMethod ?? "";
  const shippingCharges = shippingMethod === "storePickup" ? 0 : 150;

  // console.log("deliveryDate: " + deliveryDate);
  // console.log("SelectedDate: " + selectedDate);
  // console.log("paymentMethod: " + paymentMethod);
  console.log("cartItems: " + cartItems[0].productTitle);
  // console.log("isAuthenticated: " + isAuthenticated);

  const total = totalCost + shippingCharges;

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDeliveryDate = (event) => {
    setDeliveryDate(event.target.value);
    setShowCalendar(event.target.value === "Delivery On Date");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleConfirmOrder = async () => {
    const orderId = Math.floor(Math.random() * 900000) + 100000;

    const orderItems = cartItems.map((item) => ({
      productName: item.productTitle,
      productImage: item.image,
      productId: item._id,
      productQuantity: productQuantities[item._id],
      unitPrice: item.price,
    }));

    const body = {
      orderId: orderId.toString(),
      orderItems: orderItems,
      totalPrice: totalCost,
      shippingMethod: shippingMethod,
      additionalComments: message,
      shippingCharges: shippingCharges,
    };

    // const data = {
    //   orderId: orderId.toString(),
    //   productName: cartItems[0].productTitle,
    //   productId: cartItems[0]._id,
    //   productQuantity: productQuantities[cartItems[0]._id],
    //   // customerName: "John Doe", // Replace with the actual customer name
    //   // phoneNo: "1234567890", // Replace with the actual customer phone number
    //   totalPrice: totalCost,
    //   shippingMethod: shippingMethod,
    //   additionalComments: message,
    // };

    try {
      // Send the POST request to the backend API endpoint
      const response = await axios.post(
        "http://localhost:3000/orderList/postOrder",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the response
      setSuccessMessage(response.data.message);
      console.log("Order confirmation response:", response.data.message);
      // TODO: Show confirmation message and clear cart state data
      setShowPopup(true);
    } catch (error) {
      console.error("Error confirming order:", error);
      // TODO: Handle error and show appropriate message to the user
    }
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 5 }}>
      <BreadcrumbsComponent name={t("Checkout")} path={"/checkout"} />
      <Typography variant="h1" my={2}>
        {t("Checkout")}
      </Typography>
      <Grid container spacing={2}>
        {cartItems.length === 0 ? (
          <Grid item xs={12} md={12}>
            <ErrorMessage
              path={"/shop"}
              errorMessage={t("Your cart is empty")}
              linkMsg={t("Return to shopping")}
            />
          </Grid>
        ) : (
          <>
            <Grid item xs={12} md={8} pb={2} order={{ md: 1, sm: 2 }}>
              <Paper variant="outlined" sx={{ py: 2, px: 3 }}>
                {isAuthenticated && (
                  <>
                    <Typography variant="h6">{t('Address')}</Typography>
                    <Divider />
                    {/* TODO: Add address form here */}
                    <Skeleton />
                    <Skeleton width="50%" />
                    <Divider />
                  </>
                )}

                <Box pb={1}>
                  <Typography variant="h6">{t('Delivery Date/Time')}</Typography>
                  <FormControl component="fieldset" sx={{ px: 2 }}>
                    <RadioGroup
                      aria-label="delivery date"
                      name="controlled-radio-buttons-group"
                      value={deliveryDate}
                      onChange={handleDeliveryDate}
                    >
                      <FormControlLabel
                        value="Same Day Delivery"
                        control={<Radio size="small" />}
                        label={t("Same Day Delivery")}
                        sx={{ marginBottom: "-10px" }}
                      />
                      <FormControlLabel
                        value="Next Day Delivery"
                        control={<Radio size="small" />}
                        label={t("Next Day Delivery")}
                        sx={{ marginBottom: "-10px" }}
                      />
                      <FormControlLabel
                        value="Delivery On Date"
                        control={<Radio size="small" />}
                        label={t("Delivery On Date")}
                        sx={{ marginBottom: "-10px" }}
                      />
                      <Box pl={3.5}>
                        {showCalendar && (
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              label={t("Select delivery date")}
                              value={selectedDate}
                              onChange={handleDateChange}
                              sx={{ mt: 2 }}
                              inputFormat="dd/MM/yyyy"
                            >
                              {({ inputProps, inputRef, ...other }) => (
                                <TextField
                                  {...inputProps}
                                  inputRef={inputRef}
                                  {...other}
                                />
                              )}
                            </DatePicker>
                          </LocalizationProvider>
                        )}
                      </Box>
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Divider />
                <Box pb={1}>
                  <Typography variant="h6">{t('Payment Method')}</Typography>
                  <FormControl component="fieldset" sx={{ px: 2 }}>
                    <RadioGroup
                      aria-label="delivery date"
                      name="controlled-radio-buttons-group"
                      value={paymentMethod}
                    >
                      <FormControlLabel
                        value="Cash on Delivery"
                        control={<Radio size="small" />}
                        label={t("Cash on Delivery")}
                        sx={{ marginBottom: "-10px" }}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Paper>
              <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                {isAuthenticated ? (
                  <>
                    <Button variant="contained" onClick={handleConfirmOrder}>
                      {t('Confirm Order')}
                    </Button>
                    <ConfirmationDialog
                      open={showPopup}
                      onClose={handleClosePopup}
                      message={successMessage}
                    />
                  </>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => navigate("/account/login")}
                  >
                    {t('Login to Place Order')}
                  </Button>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={4} pb={2} order={{ md: 2, sm: 1 }}>
              <Paper variant="outlined" sx={{ p: 1 }}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography textAlign="center" variant="h6">
                      {t("Order Summary")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  {message && (
                    <Grid item xs={12}>
                      <Box py={2}>
                        <Typography variant="body2" fontWeight={600}>
                          {t('Additional Message')}
                        </Typography>
                        <Typography variant="body2">{message}</Typography>
                      </Box>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    {cartItems.map((item) => (
                      <Box key={item.id} pt={1}>
                        <CheckoutItem
                          item={item}
                          productQuantities={productQuantities}
                        />
                        <Divider />
                      </Box>
                    ))}
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography fontWeight={600}>{t('Subtotal')}</Typography>
                      <Typography>AFN {totalCost.toFixed(2)}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography fontWeight={600}>{t('Shipping')}</Typography>
                      <Typography>AFN {shippingCharges.toFixed(2)}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography fontWeight={600}>{t('Total')}</Typography>
                      <Typography>AFN: {total.toFixed(2)}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}

export default Checkout;
