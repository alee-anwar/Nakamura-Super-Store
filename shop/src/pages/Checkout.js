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
import EmptyMessage from "../components/EmptyMessage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CheckoutItem from "../components/CheckoutItem";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Checkout({
  cartItems,
  totalCost,
  isAuthenticated,
  productQuantities,
  setCartItems,
}) {
  const [deliveryDate, setDeliveryDate] = useState("Same Day Delivery");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const { t } = useTranslation();
  const status = "Pending";

  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message ?? "";
  const shippingMethod = location.state?.shippingMethod ?? "";
  const shippingCharges = shippingMethod === "Store Pickup" ? 0 : 150;

  const total = totalCost + shippingCharges;

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const { firstName, lastName, houseNo, phoneNo, streetNo, town, _id } =
    userInfo ?? {};

  const handleClosePopup = () => {
    setShowPopup(false);
    localStorage.removeItem("cartItems");
    setCartItems([]);
  };

  const handleDeliveryDate = (event) => {
    const value = event.target.value;
    setDeliveryDate(value);
    setShowCalendar(value === "Delivery On Date");

    // If the user selects "Delivery On Date," set the selected date as the delivery date
    // if (value === "Delivery On Date") {
    //   // setDeliveryDate(selectedDate.toLocaleDateString("en-GB")); // Set the date in "DD/MM/YYYY" format
    //   setDeliveryDate(selectedDate.toISOString());
    // }
  };

  useEffect(() => {
    console.log("handleDeliveryDate:", deliveryDate);
  }, [deliveryDate, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Update the delivery date if the user selects a specific date
    if (deliveryDate === "Delivery On Date") {
      setDeliveryDate(date.toLocaleDateString("en-GB")); // Set the date in "DD/MM/YYYY" format
    }
    console.log("handleDateChange:  " + selectedDate);
  };

  const orderId = Math.floor(Math.random() * 900000) + 100000;

  const handleConfirmOrder = async () => {
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
      totalPrice: total,
      shippingMethod: shippingMethod,
      paymentMethod: paymentMethod,
      shippingCharges: shippingCharges,
      additionalComments: message,
      customerId: _id,
      firstName: firstName,
      lastName: lastName,
      houseNo: houseNo,
      phoneNo: phoneNo,
      streetNo: streetNo,
      town: town,
      deliveryDate: deliveryDate,
      subTotal: totalCost,
      shippingCost: shippingCharges,
      status: status,
    };
    console.log("quantity:");
    body.orderItems.forEach((item) => {
      console.log(item.productQuantity);
    });
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
      console.log("response: ", response.data);
      setSuccessMessage(response.data.message);
      console.log("Order confirmation response:", response.data.message);
      // TODO: Show confirmation message and clear cart state data
      setShowPopup(true);
    } catch (error) {
      console.error("Error confirming order:", error);
      // TODO: Handle error and show appropriate message to the user
    }
  };

  // setIsAuthenticated(true);

  return (
    <Container maxWidth="lg" sx={{ pt: 5 }}>
      <BreadcrumbsComponent name={t("Checkout")} path={"/checkout"} />
      <Typography variant="h1" my={2}>
        {t("Checkout")}
      </Typography>
      <Grid container spacing={2}>
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
            <Grid item xs={12} md={8} pb={2} order={{ md: 1, sm: 2 }}>
              <Paper variant="outlined" sx={{ py: 2, px: 3 }}>
                {isAuthenticated && (
                  <>
                    <Typography variant="h6">{t("Address")}</Typography>
                    <Divider />
                    <Typography color="textSecondary" my={2}>
                      {userInfo ? (
                        <p>{`House# ${houseNo}, street# ${streetNo}, ${town}`}</p>
                      ) : (
                        <>
                          <Skeleton />
                          <Skeleton width="50%" />
                        </>
                      )}
                    </Typography>
                    {/* TODO: Add address form here */}

                    <Divider />
                  </>
                )}

                <Box pb={1}>
                  <Typography variant="h6">{t("Delivery Date")}</Typography>
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
                              inputFormat="dd/MM/yyyy" // Set the input date format as "DD/MM/YYYY"
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
                  <Typography variant="h6">{t("Payment Method")}</Typography>
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
                      {t("Confirm Order")}
                    </Button>
                    <ConfirmationDialog
                      open={showPopup}
                      onClose={handleClosePopup}
                      message={successMessage}
                      orderId={orderId}
                    />
                  </>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => navigate("/account/login")}
                  >
                    {t("Login to Place Order")}
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
                          {t("Additional Message")}
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
                      <Typography fontWeight={600}>{t("Subtotal")}</Typography>
                      <Typography>AFN {totalCost.toFixed(2)}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography fontWeight={600}>{t("Shipping")}</Typography>
                      <Typography>AFN {shippingCharges.toFixed(2)}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography fontWeight={600}>{t("Total")}</Typography>
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
