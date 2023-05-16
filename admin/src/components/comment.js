// renderInput={(params) => (
//   <TextField
//     {...params}
//     // margin="dense"
//     fullWidth
//     size="small"
//     required
//     sx={{
//       "& .MuiInputBase-root": {
//         height: "32px", // Adjust the desired height here
//       },
//     }}
//   />
// )}

//   <Grid container item spacing={2} direction="column" md={4}>
//   <Grid item>
//     <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
//       <FormControl required>
//         <FormLabel>Category</FormLabel>
//         <FormGroup>
//           {categories.map((category) => (
//             <FormControlLabel
//               key={category}
//               value={values.category}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               error={touched.category && Boolean(errors.category)}
//               helperText={touched.category && errors.category}
//               control={
//                 <Checkbox
//                   size="small"
//                   disableRipple={true}
//                   sx={{ color: "#757575" }}
//                 />
//               }
//               label={
//                 <Typography sx={{ color: "#757575" }}>
//                   {category}
//                 </Typography>
//               }
//               sx={{ mb: -1 }}
//             />
//           ))}
//         </FormGroup>
//       </FormControl>
//     </Paper>
//   </Grid>

//   <Grid item>
//     <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
//       <FormLabel>Sub Category</FormLabel>
//       <FormGroup
//       // value={subcategory}
//       // onChange={(e) => setSubCategory(e.target.value)}
//       >
//         {subcategories.map((subcategory, index) => (
//           <FormControlLabel
//             key={index}
//             value={subcategory.value}
//             control={
//               <Checkbox
//                 size="small"
//                 disableRipple={true}
//                 sx={{ color: "#757575" }}
//                 // checked={checkedItems[subcategory.value] || false}
//                 // onChange={handleChange}
//               />
//             }
//             label={
//               <Typography sx={{ color: "#757575" }}>
//                 {subcategory.label}
//               </Typography>
//             }
//             sx={{ mb: -1 }}
//           />
//         ))}
//       </FormGroup>
//     </Paper>
//   </Grid>
// </Grid>

{
  /* <Grid item sm={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Date"
                        name="date"
                        value={formik.values.date}
                        // onChange={(newValue) =>
                        //   formik.setFieldValue("date", parseISO(newValue))
                        // }
                        onChange={(newValue) => formik.setFieldValue('date', newValue)}

                        onBlur={formik.handleBlur}
                        // sx={{
                        //   width: "100%",
                        //   marginTop: 1,
                        //   "& .MuiInputBase-input.MuiOutlinedInput-input": {
                        //     paddingTop: "8.5px",
                        //     paddingBottom: "8.5px",
                        //   },
                        // }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="dense"
                            fullWidth
                            size="small"
                            error={formik.touched.date && formik.errors.date}
                            helperText={formik.touched.date && formik.errors.date}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid> */
}

/////////////////////Edit Product

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
      
        <Grid container spacing={2}>
          <Grid container item spacing={2} direction="row" md={8} mt={0.1}>
            {/* <Grid item> */}
            <Stack spacing={2}>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <Typography color="textSecondary">Producut Details</Typography>
              </Paper>

 

   
            </Stack>
          </Grid>

          
        </Grid>
        <Button type="submit" variant="contained">
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default EditProduct;
