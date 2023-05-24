import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Typography,
  FormHelperText,
  FormGroup,
  Grid,
  MenuItem,
  Box,
  Stack,
  Paper,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { categories, subcategories } from "./data";

import { useTheme } from "@mui/material/styles";

const validationSchema = Yup.object().shape({
  sku: Yup.string().required("SKU is required"),
  category: Yup.string().required("Category is required"),
  status: Yup.string().required("Status is required"),
  subcategory: Yup.string().required("Subcategory is required"),
  image: Yup.string().required("Image is required"),
  stock: Yup.number().required("Stock is required"),

  productTitle: Yup.string().required("Title is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  // Add more validation rules for other fields as needed
});

const ProductEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      productTitle: "",
      sku: "",
      description: "",
      category: "",
      price: 0,
      status: "",
      subcategory: "",
      color: "",
      tag: "",
      image: "",
      stock: "",
      size: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      setErrorMsg(null);
      setSuccess(false);

      // Update the product in the database
      console.log("PUT API called");
      console.log("Values:", values);
      axios
        .put(`http://localhost:3000/productList/updateProduct/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Data updated:", response.data);
          resetForm();
          navigate("/products");
        })
        .catch((error) => {
          console.error("Error updating data:", error);
          if (error.response) {
            // Request was made and server responded with a non-2xx status code
            setErrorMsg(error.response.data.message);
          } else if (error.request) {
            // Request was made but no response was received
            setErrorMsg("Network error. Please try again later.");
          } else {
            // Something else happened in making the request
            setErrorMsg("An error occurred. Please try again.");
          }
        })
        .finally(() => {
          setSubmitting(false);
        });
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
        console.log(response.data.productdescription.productTitle);
        formik.setValues(response.data.productdescription);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <Box maxWidth={"md"} ml={{ sm: 0, md: 0, lg: 20 }} mb={3}>
      <Box sx={theme.mixins.toolbar} />
      {errorMsg && (
        <Alert severity="error">
          <Typography variant="body2" color="error">
            {errorMsg}
          </Typography>
        </Alert>
      )}
      {success && (
        <Alert severity="success">
          <Typography variant="body2" color="success">
            Product Create Successful!
          </Typography>
        </Alert>
      )}
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex" }} mb={3}>
          <Typography sx={{ flexGrow: 1 }} variant="h1">
            Edit Product
          </Typography>
          <Button
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Saving..." : " Save Changes"}
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid container item spacing={2} direction="row" md={8} mt={0.1}>
            <Stack spacing={2}>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <Typography color="textSecondary">Producut Details</Typography>
                <Grid container columnSpacing={1}>
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
                      name="stock"
                      label="Stock"
                      value={formik.values.stock}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.stock &&
                        Boolean(formik.errors.stock)
                      }
                      helperText={
                        formik.touched.stock && formik.errors.stock
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
                      error={
                        formik.touched.status && Boolean(formik.errors.status)
                      }
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
                    formik.touched.description &&
                    Boolean(formik.errors.description)
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
                  <FormGroup>
                    {categories.map((category) => (
                      <FormControlLabel
                        key={category.id}
                        control={
                          <Checkbox
                            checked={formik.values.category === category.value}
                            size="small"
                            disableRipple={true}
                            sx={{ color: "#757575" }}
                            name="category"
                            value={category.value}
                            // onChange={formik.handleChange}
                            onChange={() => {
                              // Update the value of category field
                              if (formik.values.category === category.value) {
                                // If the same category is already selected, remove the value
                                formik.setFieldValue("category", "");
                              } else {
                                // Set the new selected value
                                formik.setFieldValue(
                                  "category",
                                  category.value
                                );
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
                  </FormGroup>
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
                  <FormGroup>
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
                  </FormGroup>
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

        {/* Add more fields as needed */}
      </form>
    </Box>
  );
};

export default ProductEditForm;
