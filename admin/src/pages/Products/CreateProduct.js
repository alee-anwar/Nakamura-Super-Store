import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
// import { parseISO } from "date-fns";
import { categories, subcategories } from "./data";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  productTitle: Yup.string().required("Title is required"),
  stock: Yup.string().required("Enter Product Stock"),
  sku: Yup.string().required("SKU is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  // status: Yup.string().required("Status is required"),
  date: Yup.date().required("Date is required"),
  category: Yup.string().required("Category is required"),
  image: Yup.string().required("Image is required"),
});

const CreateProductForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      productTitle: "",
      sku: "",
      description: "",
      category: "",
      subcategory: "",
      price: "",
      status: "",
      color: "",
      tag: "",
      image: "",
      stock: "",
      size: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      setErrorMsg(null);
      setSuccess(false);
      console.log(values);

      axios
        .post("http://localhost:3000/productList/postProduct", values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Data updated:", response.data);
          console.log("Signup success:", response.data);
          setSuccess(true);

          resetForm();
          navigate("/products");
        })
        .catch((error) => {
          console.error("Error posting data:", error);
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
        <Box component="div" sx={{ display: "flex" }} mb={3}>
          <Typography sx={{ flexGrow: 1 }} variant="h1">
            Add Product
          </Typography>
          <Button
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Publishing..." : "Publish Now"}
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid container item spacing={2} direction="row" md={8} mt={0.1}>
            {/* <Grid item> */}
            <Stack spacing={2}>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <Typography color="textSecondary">Producut Details</Typography>
                <Grid container columnSpacing={2}>
                  <Grid item sm={12} md={6}>
                    <TextField
                      label="SKU"
                      name="sku"
                      value={formik.values.sku}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.sku && Boolean(formik.errors.sku)}
                      helperText={formik.touched.sku && formik.errors.sku}
                      fullWidth
                      size="small"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <TextField
                      margin="dense"
                      label="stock"
                      name="stock"
                      value={formik.values.stock}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.stock && Boolean(formik.errors.stock)
                      }
                      helperText={formik.touched.stock && formik.errors.stock}
                      fullWidth
                      size="small"
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
                      fullWidth
                      size="small"
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
                      fullWidth
                      size="small"
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
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <TextField
                      margin="dense"
                      select
                      label="Tag"
                      name="tag"
                      value={formik.values.tag || ""} // Use empty string as the default value
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.tag && Boolean(formik.errors.tag)}
                      helperText={formik.touched.tag && formik.errors.tag}
                      fullWidth
                      size="small"
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="Featured">Featured</MenuItem>
                      <MenuItem value="Healthy">Healthy</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <TextField
                      margin="dense"
                      label="Price"
                      name="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.price && Boolean(formik.errors.price)
                      }
                      helperText={formik.touched.price && formik.errors.price}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <TextField
                      margin="dense"
                      select
                      label="Status"
                      name="status"
                      value={formik.values.status || ""} // Use empty string as the default value
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.status && Boolean(formik.errors.status)
                      }
                      helperText={formik.touched.status && formik.errors.status}
                      fullWidth
                      size="small"
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Deactive">Deactive</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Paper>
              {/* </Grid> */}
              {/* <Grid item sm={12} md={12}> */}
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
                />
              </Paper>
              {/* </Grid> */}
              {/* <Grid item sm={12} md={12}> */}
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <Typography color="textSecondary">Images</Typography>
                <TextField
                  margin="dense"
                  label="URL"
                  fullWidth
                  size="small"
                  name="image"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.image && Boolean(formik.errors.image)}
                  helperText={formik.touched.image && formik.errors.image}
                />
              </Paper>
              {/* </Grid> */}
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
      </form>
    </Box>
  );
};

export default CreateProductForm;

{
  /* <Grid item sm={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Date"
                        name="date"
                        value={formik.values.date}
                        onChange={(newValue) =>
                          formik.setFieldValue("date", newValue)
                        }
                        onBlur={formik.handleBlur}
                        sx={{
                          width: "100%",
                          marginTop: 1,
                          "& .MuiInputBase-input.MuiOutlinedInput-input": {
                            paddingTop: "8.5px",
                            paddingBottom: "8.5px",
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid> */
}

{
  /* <Grid item>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <FormControl required component="fieldset">
                  <FormLabel>Sub Categories</FormLabel> */
}
{
  /* <FormGroup> */
}
{
  /* {subcategories.map((subcategory) => (
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
                  {/* </FormGroup> */
}
{
  /* {formik.touched.subcategory && formik.errors.subcategory && (
                    <FormHelperText error>
                      {formik.errors.subcategory}
                    </FormHelperText>
                  )}
                </FormControl>
              </Paper>
            </Grid> */
}

{
  /* <Button
            variant="contained"
            sx={{ bgcolor: "white", color: "black", mr: 2 }}
            disabled
          >
            Save To Draft
          </Button> */
}
{
  /* <Button type="submit" variant="contained"> */
}
{
  /* {formik.isSubmitting ? "Publishing..." : "Publish Now"} */
}
{
  /* Publish Now */
}
{
  /* </Button> */
}
