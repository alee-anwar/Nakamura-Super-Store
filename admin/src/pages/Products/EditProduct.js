import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik, Form, Field } from 'formik';

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  id: Yup.string().required("ID is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number().required("Price is required"),
  status: Yup.string().required("Status is required"),
  date: Yup.date().required("Date is required"),
  subcategory: Yup.string().required("Subcategory is required"),
  color: Yup.string().required("Color is required"),
  tag: Yup.string().required("Tag is required"),
  image: Yup.string().required("Image is required"),
  quantity: Yup.number().required("Quantity is required"),
});

const initialValues = {
  title: "",
  id: "",
  description: "",
  category: "",
  price: "",
  status: "",
  date: "",
  subcategory: "",
  color: "",
  tag: "",
  image: "",
  quantity: "",
};

const categories = [
  "Biscuits",
  "Beverages",
  "Candy & Chocolate",
  "Chips & Pretzels",
  "Food",
  "Meat & Fish",
  "Snacks",
];

const subcategories = [
  { value: "Baking Needs", label: "Baking Needs" },
  { value: "Baby Food", label: "Baby Food" },
  { value: "Baby Care", label: "Baby Care" },
  { value: "Canned Foods", label: "Canned Foods" },
  { value: "Butter & Sour Cream", label: "Butter & Sour Cream" },
  { value: "Instant Foods", label: "Instant Foods" },
  { value: "Meat", label: "Meat" },
  { value: "Liquid & UHT Milk", label: "Liquid & UHT Milk" },
  { value: "Mineral Water", label: "Mineral Water" },
  { value: "Oral Care", label: "Oral Care" },
  { value: "Pulses & Chickpeas", label: "Pulses & Chickpeas" },
];

const onSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
  try {
    const response = await axios.put("http://localhost:8000/products", values);
    console.log(response.data);
    setStatus("Success");
    resetForm();
  } catch (error) {
    console.error(error);
    setStatus("Error");
  } finally {
    setSubmitting(false);
  }
};

const EditProduct = () => {
  const theme = useTheme();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const { values, errors, touched, handleBlur,handleChange, handleSubmit, isSubmitting } =
    formik;
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box maxWidth={"md"} ml={20} mb={3}>
        <Box sx={theme.mixins.toolbar} />
        <Box sx={{ display: "flex" }} mb={3}>
          <Typography sx={{ flexGrow: 1 }} variant="h1">
            Edit Product
          </Typography>
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </Box>
        <Grid container spacing={2} display="flex">
          <Grid container item spacing={2} direction="row" md={8}>
            <Grid item>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <Typography color="textSecondary">Producut Details</Typography>
                <Grid container columnSpacing={2}>
                  <Grid item md={6}>
                    <TextField
                      margin="dense"
                      label="SKU"
                      fullWidth
                      size="small"
                      required
                      value={formik.values.id}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.id && Boolean(formik.errors.id)}
                      helperText={formik.touched.id && formik.errors.id}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      margin="dense"
                      label="Quantity"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      margin="dense"
                      label="Title"
                      fullWidth
                      size="small"
                      required
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.title && Boolean(formik.errors.title)
                      }
                      helperText={formik.touched.title && formik.errors.title}
                    />
                  </Grid>

                  <Grid item md={6}>
                    <TextField
                      margin="dense"
                      label="Color"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      margin="dense"
                      label="Tag"
                      fullWidth
                      size="small"
                      value={values.tag}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.tag && Boolean(errors.tag)}
                      helperText={touched.tag && errors.tag}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      margin="dense"
                      label="Price"
                      fullWidth
                      size="small"
                      required
                    />
                  </Grid>
                  <Grid item md={6}>
                    {/* <InputLabel id="status-label">Status</InputLabel> */}
                    <TextField
                      select
                      label="Status"
                      id="status"
                      fullWidth
                      size="small"
                      required
                      margin="dense"
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value={"Activate"}>Activate</MenuItem>
                      <MenuItem value={"Deactivate"}>Deactivate</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        // value={date ? parseISO(date) : null}
                        // onChange={(e) => setDate(e.target.value)}
                        value={values.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.date && Boolean(errors.date)}
                        helperText={touched.date && errors.date}
                        InputLabelProps={{ shrink: true }}
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
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item md={12}>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <Typography color="textSecondary">Description</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={7}
                  required
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={touched.description && errors.description}
                />
              
                {formik.touched.description && formik.errors.description}
              </Paper>
            </Grid>
            <Grid item md={12}>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <Typography color="textSecondary">Images</Typography>
                <TextField margin="dense" label="URL" fullWidth size="small" />
              </Paper>
            </Grid>
          </Grid>
          <Grid container item spacing={2} direction="column" md={4}>
            <Grid item>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <FormControl required>
                  <FormLabel>Category</FormLabel>
                  <FormGroup
                  // value={category}
                  // onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <FormControlLabel
                        key={category}
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.category && Boolean(errors.category)}
                        helperText={touched.category && errors.category}
                        control={
                          <Checkbox
                            size="small"
                            disableRipple={true}
                            sx={{ color: "#757575" }}
                          />
                        }
                        label={
                          <Typography sx={{ color: "#757575" }}>
                            {category}
                          </Typography>
                        }
                        sx={{ mb: -1 }}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Paper>
            </Grid>

            <Grid item>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <FormLabel>Sub Category</FormLabel>
                <FormGroup
                // value={subcategory}
                // onChange={(e) => setSubCategory(e.target.value)}
                >
                  {subcategories.map((subcategory, index) => (
                    <FormControlLabel
                      key={index}
                      value={subcategory.value}
                      control={
                        <Checkbox
                          size="small"
                          disableRipple={true}
                          sx={{ color: "#757575" }}
                          // checked={checkedItems[subcategory.value] || false}
                          // onChange={handleChange}
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
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default EditProduct;
