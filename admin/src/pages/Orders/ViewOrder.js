import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Select,
  Stack,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import moment from "moment";

const ViewOrder = () => {
  const theme = useTheme();
  const { orderId } = useParams();
  // const [order, setOrder] = useState(null);
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [updatedOrderStatus, setUpdatedOrderStatus] = useState(order.status);
  const [resMessage, setResMessage] = useState("");

  const handleChange = (event) => {
    setUpdatedOrderStatus(event.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/orderList/updateOrderStatus/${orderId}`,
        {
          status: updatedOrderStatus,
        }
      );
      // Handle the response if needed
      console.log("status response", response.data);
      console.log("status Message", response.data.message);
      setResMessage(response.data.message);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/orderList/view-single-order/${orderId}`
        );
        const data = response.data;
        setOrder(data);
        console.log(order);
        setIsLoading(false);
        setUpdatedOrderStatus(data.status); // Set initial order status
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!order) {
    return <Typography>Error: Order not found</Typography>;
  }

  const {
    customerId,
    firstName,
    lastName,
    phoneNo,
    town,
    streetNo,
    houseNo,
    shippingMethod,
    paymentMethod,
    orderItems,
    additionalComments,
    orderDate,
    deliveryDate,
    subTotal,
    shippingCost,
    totalPrice,
    status, // should be pending
  } = order;

  const formattedOrderDate = moment(orderDate).format("DD/MM/YYYY");

  return (
    <Box>
      <Box sx={theme.mixins.toolbar} />
      {resMessage && (
        <Alert severity="success" onClose={() => setResMessage("")}>
          {resMessage}
        </Alert>
      )}
      <Box sx={{ display: "flex" }} mb={3}>
        <Typography sx={{ flexGrow: 1 }} variant="h1">
          Order Details
        </Typography>
      </Box>

      <Container maxWidth={false}>
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item md={12} display="flex">
              <Box flexGrow={1}>
                <Box display="flex" flexDirection="column">
                  <Box display="flex">
                    <Typography fontWeight={600} variant="h6">
                      Order#
                    </Typography>
                    <Typography pl={1} color="textSecondary" variant="h6">
                      {order.orderId}
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Typography fontWeight={600}>Order Date:</Typography>
                    <Typography pl={1} color="textSecondary">
                      {formattedOrderDate}
                    </Typography>
                    <Typography pl={3} fontWeight={600}>
                      Delivery Date:
                    </Typography>
                    <Typography pl={1} color="textSecondary">
                      {deliveryDate}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Stack direction="row" spacing={2}>
                <Select
                  size="small"
                  // label="Status"
                  value={updatedOrderStatus}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  style={{ minWidth: order.status ? "auto" : "150px" }}
                >
                  {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem> */}
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
                <Button variant="outlined" size="small" onClick={handleSave}>
                  Save
                </Button>
              </Stack>
            </Grid>
            <Grid item md={12}>
              <Divider />
            </Grid>
            <Grid container item md={12}>
              <Grid item md={4}>
                <Typography fontWeight={600}>Customer</Typography>
                <Typography color="textSecondary">{`Name: ${firstName} ${lastName}`}</Typography>
                <Typography color="textSecondary">Phone# {phoneNo}</Typography>
              </Grid>
              <Grid item md={4}>
                <Typography fontWeight={600}>Method/Status</Typography>
                <Typography color="textSecondary">
                  Shipping Method: {shippingMethod}
                </Typography>
                <Typography color="textSecondary">
                  Payment Method: {paymentMethod}
                </Typography>
                <Typography color="textSecondary">Status: {status}</Typography>
              </Grid>
              <Grid item md={4}>
                <Typography fontWeight={600}>Deliver to</Typography>
                <Typography color="textSecondary">Town: {town}</Typography>
                <Typography color="textSecondary">
                  Street: {streetNo}
                </Typography>
                <Typography color="textSecondary">House# {houseNo}</Typography>
              </Grid>
            </Grid>
            <Grid container item md={12} spacing={2}>
              <Grid item md={8}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product Image</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Unit Price</TableCell>
                        <TableCell>Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orderItems &&
                        orderItems.map((item) => (
                          <TableRow key={item.productId}>
                            <TableCell>
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                height={50}
                                width={50}
                              />
                            </TableCell>
                            <TableCell>{item.productName}</TableCell>
                            <TableCell>{item.productQuantity || 1}</TableCell>
                            <TableCell>{item.unitPrice}</TableCell>
                            <TableCell>
                              {(item.productQuantity || 1) * item.unitPrice}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid
                  item
                  container
                  md={12}
                  display="flex"
                  justifyContent="flex-end"
                  pt={2}
                  spacing={1.5}
                >
                  {/* <Stack pr={3}> */}

                  <Grid item>
                    <Typography variant="body1" align="right">
                      Subtotal:
                    </Typography>

                    <Typography variant="body1" align="right">
                      Shipping Cost:
                    </Typography>

                    <Typography variant="body1" align="right" color="error">
                      Total:
                    </Typography>
                  </Grid>
                  <Grid item color="textSecondary">
                    <Typography variant="body1" color="textSecondary">
                      {subTotal}
                    </Typography>

                    <Typography variant="body1" color="textSecondary">
                      {shippingCost}
                    </Typography>

                    <Typography variant="body1" color="error">
                      {totalPrice}
                    </Typography>
                  </Grid>

                  {/* </Stack> */}
                </Grid>
              </Grid>
              <Grid item md={4}>
                <Box py={2}>
                  <Typography variant="body2" fontWeight={600}>
                    Additional Message
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    value={additionalComments}
                    disabled
                    // onChange={(event) => event.target.value}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default ViewOrder;
