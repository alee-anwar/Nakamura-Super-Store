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
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import ErrorMessage from "../components/ErrorMessage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CheckoutItem from "../components/CheckoutItem";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../components/ConfirmationDialog";

function Checkout({ cartItems, totalCost, isAuthenticated }) {
  const [deliveryDate, setDeliveryDate] = React.useState("Same Day Delivery");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const shipping = 150;
  const total = totalCost + shipping;
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleConfirmOrder = () => {
    // Perform order confirmation process here
    setShowPopup(true);
    // handleFormSubmit();
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // Navigate back to shopping page here using React Router
  };

  const handleDeliveryDate = (event) => {
    setDeliveryDate(event.target.value);
    setShowCalendar(event.target.value === "Delivery On Date");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // TODO: Submit form data to backend API or server for order processing
    console.log("Order placed:", {
      cartItems,
      totalCost,
      deliveryDate,
      selectedDate,
    });
    // TODO: Show confirmation message and clear cart state data
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 5 }}>
      <BreadcrumbsComponent name={"Checkout"} path={"/checkout"} />
      <Typography variant="h1" my={2}>
        Checkout
      </Typography>
      <Grid container spacing={2}>
        {cartItems.length === 0 ? (
          <Grid item xs={12} md={12}>
            <ErrorMessage
              path={"/shop"}
              errorMessage={" Your cart is empty"}
              linkMsg={"Return to shopping"}
            />
          </Grid>
        ) : (
          <>
            <Grid item xs={12} md={8} pb={2}>
              <Paper variant="outlined" sx={{ py: 2, px: 3 }}>
                {isAuthenticated && (
                  <>
                    <Typography variant="h6">Address</Typography>
                    <Divider />
                    {/* TODO: Add address form here */}
                    <Skeleton />
                    <Skeleton width="50%" />
                    <Divider />
                  </>
                )}

                <Box pb={1}>
                  <Typography variant="h6">Delivery Date/Time</Typography>
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
                        label="Same Day Delivery"
                        sx={{ marginBottom: "-10px" }}
                      />
                      <FormControlLabel
                        value="Next Day Delivery"
                        control={<Radio size="small" />}
                        label="Next Day Delivery"
                        sx={{ marginBottom: "-10px" }}
                      />
                      <FormControlLabel
                        value="Delivery On Date"
                        control={<Radio size="small" />}
                        label="Delivery On Date"
                        sx={{ marginBottom: "-10px" }}
                      />
                      <Box pl={3.5}>
                        {showCalendar && (
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              label="Select delivery date"
                              value={selectedDate}
                              onChange={handleDateChange}
                              sx={{ mt: 2 }}
                              inputFormat="dd/MM/yyyy"
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </LocalizationProvider>
                        )}
                      </Box>
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Divider />
                <Box pb={1}>
                  <Typography variant="h6">Payment Method</Typography>
                  <FormControl component="fieldset" sx={{ px: 2 }}>
                    <RadioGroup
                      aria-label="delivery date"
                      name="controlled-radio-buttons-group"
                      value={paymentMethod}
                    >
                      <FormControlLabel
                        value="Cash on Delivery"
                        control={<Radio size="small" />}
                        label="Cash on Delivery"
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
                      Confirm Order
                    </Button>
                    <ConfirmationDialog
                      open={showPopup}
                      onClose={handleClosePopup}
                      message="Your order has been confirmed"
                    />
                  </>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => navigate("/account/login")}
                  >
                    Login to Place Order
                  </Button>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={4} pb={2}>
              <Paper variant="outlined" sx={{ p: 1 }}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography textAlign="center" variant="h6">
                      Order Summary
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    {cartItems.map((item) => (
                      <Box key={item.id} pt={1}>
                        <CheckoutItem item={item} />
                        <Divider />
                      </Box>
                    ))}
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography fontWeight={600}>SubTotal</Typography>
                      <Typography>Rs {totalCost.toFixed(2)}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography fontWeight={600}>Shipping</Typography>
                      <Typography>Rs {shipping.toFixed(2)}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography fontWeight={600}>Total</Typography>
                      <Typography>Rs {total.toFixed(2)}</Typography>
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

{
  /* 
    const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  
  <h1>Checkout</h1>
      <h2>Order Summary:</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>
            {item.productTitle} x {item.quantity} - ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p>Total Cost: ${totalCost}</p>
      <h2>Shipping Information:</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        <br />
        <button type="submit">Place Order</button>
      </form> */
}
