import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { categories, subcategories } from "./data";
import { useNavigate, useParams } from "react-router-dom";
import { parseISO } from "date-fns";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  sku: Yup.string().required("SKU is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  status: Yup.string().required("Status is required"),
  // date: Yup.date().required("Date is required"),
  subcategory: Yup.string().required("Subcategory is required"),
  color: Yup.string().required("Color is required"),
  tag: Yup.string().required("Tag is required"),
  image: Yup.string().required("Image is required"),
  quantity: Yup.number().required("Quantity is required"),
});

const EditProduct = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // const [signupError, setSignupError] = useState(null);
  // const [signupSuccess, setSignupSuccess] = useState(false);
  // const [product, setProduct] = useState([]);
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      productTitle: "",
      sku: "",
      description: "",
      category: "",
      price: 0,
      status: "",
      // date: product.date || null,
      subcategory: "",
      color: "",
      tag: "",
      image: "",
      quantity: "",
      size: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // setSubmitting(true);
      console.log("PUT API called");
      console.log("value" + values);
      axios
        .put(`http://localhost:3000/productList/updateProduct/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Data updated:", response.data);
          navigate("/products");
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
      // .finally(() => {
      //   setSubmitting(false);
      // });
    },
  });

  useEffect(() => {
    // Fetch the product data using the provided ID
    console.log("GET API called");
    axios
      .get(`http://localhost:3000/productList/product-description/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Set the fetched product data as the initial form values
        // setProduct(response.data.productdescription);
        console.log(response.data.productdescription.productTitle);
        formik.setValues(response.data.productdescription);
      })
      .catch((error) => {
        // Handle errors or show an error message
        console.error(error);
      });
  }, []);

  // console.log(product.status)

  // useEffect(() => {
  //   formik.setValues({
  //     productTitle: product.productTitle || "",
  //     sku: product.sku || "",
  //     description: product.description || "",
  //     category: product.category || "",
  //     price: product.price || "",
  //     status: product.status || "",
  //     // date: product.date || null,
  //     subcategory: product.subcategory || "",
  //     color: product.color || "",
  //     tag: product.tag || "",
  //     image: product.image || "",
  //     quantity: product.quantity || "",
  //     size: product.size || "",
  //   });
  // }, [product]);

  return (
    <Box maxWidth={"md"} ml={{ sm: 0, md: 0, lg: 20 }} mb={3}>
      <Box sx={theme.mixins.toolbar} />
      {/* {signupError && (
        <Alert severity="error">
          <Typography variant="body2" color="error">
            {signupError}
          </Typography>
        </Alert>
      )}
      {signupSuccess && (
        <Alert severity="success">
          <Typography variant="body2" color="success">
            Product Create Successful!
          </Typography>
        </Alert>
      )} */}
      <form onSubmit={formik.handleSubmit}>
        {/* <Box sx={{ display: "flex" }} mb={3}> */}
          {/* <Typography sx={{ flexGrow: 1 }} variant="h1">
            Edit Product
          </Typography> */}
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        {/* </Box> */}
        <Grid container spacing={2}>
          <Grid container item spacing={2} direction="row" md={8} mt={0.1}>
            {/* <Grid item> */}
            <Stack spacing={2}>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <Typography color="textSecondary">Producut Details</Typography>
                <Grid container columnSpacing={2}>
                  <Grid item sm={12} md={6}>
                    <TextField
                      name="sku"
                      label="SKU"
                      value={formik.values.sku}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.sku && Boolean(formik.errors.sku)}
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                      margin="dense"
                      required
                      fullWidth
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <TextField
                      name="quantity"
                      label="Quantity"
                      value={formik.values.quantity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.quantity &&
                        Boolean(formik.errors.quantity)
                      }
                      helperText={
                        formik.touched.quantity && formik.errors.quantity
                      }
                      margin="dense"
                      required
                      fullWidth
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} md={12}>
                    <TextField
                      margin="dense"
                      label="Title"
                      name="productTitle"
                      value={formik.values.productTitle}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.productTitle &&
                        Boolean(formik.errors.productTitle)
                      }
                      helperText={
                        formik.touched.productTitle &&
                        formik.errors.productTitle
                      }
                      required
                      fullWidth
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item sm={12} md={6}>
                    <TextField
                      margin="dense"
                      label="Size"
                      name="size"
                      value={formik.values.size}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.size && Boolean(formik.errors.size)}
                      helperText={formik.touched.size && formik.errors.size}
                      required
                      fullWidth
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <TextField
                      margin="dense"
                      label="Color"
                      name="color"
                      value={formik.values.color}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.color && Boolean(formik.errors.color)
                      }
                      helperText={formik.touched.color && formik.errors.color}
                      required
                      fullWidth
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <TextField
                      margin="dense"
                      label="Tag"
                      name="tag"
                      value={formik.values.tag}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.tag && Boolean(formik.errors.tag)}
                      helperText={formik.touched.tag && formik.errors.tag}
                      required
                      fullWidth
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <TextField
                      name="price"
                      label="Price"
                      type="number"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.price && Boolean(formik.errors.price)
                      }
                      helperText={formik.touched.price && formik.errors.price}
                      margin="dense"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <TextField
                      margin="dense"
                      select
                      label="Status"
                      id="status"
                      name="status"
                      value={formik.values.status || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.status && Boolean(formik.errors.status)}
                      helperText={formik.touched.status && formik.errors.status}
                      required
                      fullWidth
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {/* Menu Items */}

                      <MenuItem value="">None</MenuItem>
                      <MenuItem value={"Active"}>Active</MenuItem>
                      <MenuItem value={"Deactive"}>Deactive</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Paper>

              <Paper elevation={2} sx={{ p: 3, height: "auto" }}>
                <Typography color="textSecondary">Description</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={7}
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.description && Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Paper>

              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <Typography color="textSecondary">Images</Typography>
                <TextField
                  margin="dense"
                  label="URL"
                  fullWidth
                  size="small"
                  required
                  name="image"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.image && Boolean(formik.errors.image)}
                  helperText={formik.touched.image && formik.errors.image}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Paper>
            </Stack>
          </Grid>
          <Grid container item spacing={2} direction="column" md={4}>
            <Grid item>
              <Paper elevation={2} sx={{ p: 3, height: "auto" }}>
                <FormControl required component="fieldset">
                  <FormLabel>Categories</FormLabel>
                  {/* <FormGroup> */}
                  {categories.map((category) => (
                    <FormControlLabel
                      key={category.id}
                      control={
                        <Checkbox
                          size="small"
                          disableRipple={true}
                          sx={{ color: "#757575" }}
                          name="category"
                          value={category.value}
                          // onChange={formik.handleChange}
                          checked={formik.values.category === category.value}
                          onChange={() => {
                            // Update the value of subcategory field
                            if (formik.values.category === category.value) {
                              // If the same category is already selected, remove the value
                              formik.setFieldValue("category", "");
                            } else {
                              // Set the new selected value
                              formik.setFieldValue("category", category.value);
                            }
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ color: "#757575" }}>
                          {category.label}
                        </Typography>
                      }
                      sx={{ mb: -1 }}
                    />
                  ))}
                  {/* </FormGroup> */}
                  {formik.touched.category && formik.errors.category && (
                    <FormHelperText error>
                      {formik.errors.category}
                    </FormHelperText>
                  )}
                </FormControl>
              </Paper>
            </Grid>

            <Grid item>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <FormControl required component="fieldset">
                  <FormLabel>Sub Categories</FormLabel>
                  {/* <FormGroup> */}
                  {subcategories.map((subcategory) => (
                    <FormControlLabel
                      key={subcategory.value}
                      control={
                        <Checkbox
                          checked={
                            formik.values.subcategory === subcategory.value
                          }
                          size="small"
                          disableRipple={true}
                          sx={{ color: "#757575" }}
                          name="subcategory"
                          value={subcategory.value}
                          // onChange={formik.handleChange}
                          onChange={() => {
                            // Update the value of subcategory field
                            if (
                              formik.values.subcategory === subcategory.value
                            ) {
                              // If the same subcategory is already selected, remove the value
                              formik.setFieldValue("subcategory", "");
                            } else {
                              // Set the new selected value
                              formik.setFieldValue(
                                "subcategory",
                                subcategory.value
                              );
                            }
                          }}
                          // onChange={(e) => {
                          //   const { value, checked } = e.target;
                          //   let selectedSubcategories = formik.values.subcategory.split(",");
                          //   if (checked) {
                          //     selectedSubcategories.push(value);
                          //   } else {
                          //     selectedSubcategories = selectedSubcategories.filter(
                          //       (subcat) => subcat !== value
                          //     );
                          //   }
                          //   formik.setFieldValue("subcategory", selectedSubcategories.join(","));
                          // }}
                        />
                      }
                      label={
                        <Typography sx={{ color: "#757575" }}>
                          {subcategory.label}
                        </Typography>
                      }
                      sx={{ mb: -1 }}
                    />
                  ))}
                  {/* </FormGroup> */}
                  {formik.touched.subcategory && formik.errors.subcategory && (
                    <FormHelperText error>
                      {formik.errors.subcategory}
                    </FormHelperText>
                  )}
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditProduct;
