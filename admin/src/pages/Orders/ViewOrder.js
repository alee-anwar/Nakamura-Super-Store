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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

const ViewOrder = () => {
  const theme = useTheme();
  const { orderId } = useParams();
  // const [order, setOrder] = useState(null);
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [updatedOrderStatus, setUpdatedOrderStatus] = useState(order.status);

  const handleChange = (event) => {
    setUpdatedOrderStatus(event.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/orderList/update-order-status/${orderId}`,
        {
          orderStatus: updatedOrderStatus,
        }
      );
      // Handle the response if needed
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
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
    customerName,
    phoneNo,
    shippingMethod,
    paymentMethod,
    status,
    town,
    streetNo,
    houseNo,
    orderItems,
  } = order;

  return (
    <Box>
      <Box sx={theme.mixins.toolbar} />
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
                <Typography>Date</Typography>
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
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
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
                <Typography color="textSecondary">{customerName}</Typography>
                <Typography color="textSecondary">{phoneNo}</Typography>
              </Grid>
              <Grid item md={4}>
                <Typography fontWeight={600}>Method/Status</Typography>
                <Typography color="textSecondary">{shippingMethod}</Typography>
                <Typography color="textSecondary">{paymentMethod}</Typography>
                <Typography color="textSecondary">{status}</Typography>
              </Grid>
              <Grid item md={4}>
                <Typography fontWeight={600}>Deliver to</Typography>
                <Typography color="textSecondary">{town}</Typography>
                <Typography color="textSecondary">{streetNo}</Typography>
                <Typography color="textSecondary">{houseNo}</Typography>
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
                            <TableCell>{item.productQuantity}</TableCell>
                            <TableCell>{item.unitPrice}</TableCell>
                            <TableCell>
                              {item.productQuantity * item.unitPrice}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid
                  item
                  md={12}
                  display="flex"
                  justifyContent="flex-end"
                  pt={2}
                >
                  <Stack pr={3}>
                    <Typography variant="body2">Subtotal: AFN 100</Typography>
                    <Typography variant="body2">
                      Shipping Cost: AFN 0
                    </Typography>
                    <Typography variant="body2">Total: AFN 100</Typography>
                  </Stack>
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
                    // value={value}
                    onChange={(event) => event.target.value}
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
