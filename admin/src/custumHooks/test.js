import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  productTitle: Yup.string().required("Title is required"),
  stock: Yup.string().required("Enter Product Stock"),
  sku: Yup.string().required("SKU is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  date: Yup.date().required("Date is required"),
  category: Yup.string().required("Category is required"),
  image: Yup.string().required("Image is required"),
});

const CreateProduct = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleFormSubmit = async (values) => {
    setSignupError(null);
    setSignupSuccess(false);
    console.log(values);

    try {
      const response = await axios.post(
        "http://localhost:3000/productList/postProduct",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Data posted:", response.data);
      console.log("Signup success:", response.data);
      setSignupSuccess(true);
      navigate("/products");
    } catch (error) {
      console.error("Error posting data:", error);
      if (error.response) {
        // Request was made and server responded with a non-2xx status code
        setSignupError(error.response.data.message);
      } else if (error.request) {
        // Request was made but no response was received
        setSignupError("Network error. Please try again later.");
      } else {
        // Something else happened in making the request
        setSignupError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Box maxWidth={"md"} ml={{ sm: 0, md: 0, lg: 20 }} mb={3}>
      <Box sx={theme.mixins.toolbar} />

      {signupError && (
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
      )}

      <Formik
        initialValues={{
          productTitle: "",
          sku: "",
          description: "",
          category: "",
          price: "",
          status: "",
          color: "",
          tag: "",
          image: "",
          stock: "",
          size: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, handleChange, handleBlur, touched, errors, handleSubmit }) => (
          <Form>
            <Box component="div" sx={{ display: "flex" }} mb={3}>
              <Typography sx={{ flexGrow: 1 }} variant="h1">
                Add Product
              </Typography>
              <Button type="submit" variant="contained">
                Publish Now
              </Button>
            </Box>

            <Paper elevation={3} sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product Title"
                    id="productTitle"
                    name="productTitle"
                    value={values.productTitle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.productTitle && errors.productTitle}
                    helperText={touched.productTitle && errors.productTitle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="SKU"
                    id="sku"
                    name="sku"
                    value={values.sku}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.sku && errors.sku}
                    helperText={touched.sku && errors.sku}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && errors.description}
                    helperText={touched.description && errors.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Category"
                    id="category"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.category && errors.category}
                    helperText={touched.category && errors.category}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Price"
                    id="price"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.price && errors.price}
                    helperText={touched.price && errors.price}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Stock"
                    id="stock"
                    name="stock"
                    value={values.stock}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.stock && errors.stock}
                    helperText={touched.stock && errors.stock}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Image"
                    id="image"
                    name="image"
                    value={values.image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.image && errors.image}
                    helperText={touched.image && errors.image}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Size"
                    id="size"
                    name="size"
                    value={values.size}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.size && errors.size}
                    helperText={touched.size && errors.size}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateProduct;


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
              checked={
                values.category === category.value
              }
              onChange={() => {
                // Update the value of subcategory field
                if (values.category === category.value) {
                  // If the same category is already selected, remove the value
                  setFieldValue("category", "");
                } else {
                  // Set the new selected value
                  setFieldValue(
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
      {/* </FormGroup> */}
      {touched.category && errors.category && (
        <FormHelperText error>
          {errors.category}
        </FormHelperText>
      )}
    </FormControl>
  </Paper>
</Grid>
</Grid>