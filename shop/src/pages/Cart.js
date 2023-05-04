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
} from "@mui/material";
import CartItem from "../components/CartItem";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, setCartItems, totalCost, setTotalCost }) => {
  console.log(cartItems);
  console.log("Cart Component");

  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("storePickup");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
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

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedItems = cartItems.map((item) => {
      if (item._id === itemId) {
        item.quantity = newQuantity;
      }
      return item;
    });
    setCartItems(updatedItems);
    setTotalCost(
      updatedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedItems);
    setTotalCost(
      updatedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    );
  };

  // const handleCheckout = () => {
  //   // Navigate to checkout page
  //   console.log("Checkout button clicked");
  // };

  return (
    <Container maxWidth="lg" sx={{ pt: 5 }}>
      <BreadcrumbsComponent name={"Cart"} path={"/cart"} />
      <Typography variant="h1" my={2}>
        Shopping Cart
      </Typography>
      <Grid container>
        {cartItems.length === 0 ? (
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle1">Your cart is empty.</Typography>
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
                      handleRemoveItem={handleRemoveItem}
                      handleUpdateQuantity={handleUpdateQuantity}
                    />
                  </Paper>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={4} pb={2}>
              <Paper variant="outlined" sx={{ p: 1 }}>
                <Typography textAlign="center" variant="h6" py={0}>
                  Order Summary
                </Typography>
                <Divider />
                <Box
                  py={1.5}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" fontWeight={600}>
                    Total:
                  </Typography>
                  <Typography variant="body1">
                    Rs {totalCost?.toFixed(2)}
                  </Typography>
                </Box>
                <Divider />
                <Box py={2}>
                  <Typography variant="body2" fontWeight={600}>
                    Additional Message
                  </Typography>
                  <TextField fullWidth multiline rows={5} />
                </Box>
                <Divider />
                <Box py={2}>
                  <Typography variant="body2" fontWeight={600}>
                    Shipping Method
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="delivery-option"
                      name="delivery-option"
                      value={selectedOption}
                      onChange={handleOptionChange}
                    >
                      <FormControlLabel
                        value="storePickup"
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
                            <div>Store Pickup</div>
                            <Typography
                              variant="caption"
                              sx={{ color: "#EE0300", marginLeft: 1, fontWeight: 600 }}
                            >
                              Free
                            </Typography>
                          </Typography>
                        }
                        disableTypography
                        sx={{ marginBottom: "-10px" }}
                      />
                      <FormControlLabel
                        value="homeDelivery"
                        control={
                          <Radio
                            color="primary"
                            size="small"
                            sx={{ marginRight: 0 }}
                          />
                        }
                        label="Home Delivery"
                        disableTypography
                        sx={{ marginBottom: "-10px" }}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Divider />
                <Box py={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    display="flex"
                    justifyContent="center"
                    fullWidth
                    onClick={() => navigate("/checkout")}
                  >
                    Checkout
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
