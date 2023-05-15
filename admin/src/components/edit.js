import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  productTitle: Yup.string().required('Title is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  // Add more validation rules for other fields as needed
});

const ProductEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      productTitle: '',
      price: 0,
      // Add more initial values for other fields as needed
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Update the product in the database
      console.log('PUT API called');
      console.log('Values:', values);
      axios
        .put(`http://localhost:3000/productList/updateProduct/${id}`, values, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('Data updated:', response.data);
          navigate('/products')
        })
        .catch((error) => {
          console.error('Error updating data:', error);
        });
    },
  });

  useEffect(() => {
    // Fetch the product data using the provided ID
    console.log('GET API called');
    axios
      .get(`http://localhost:3000/productList/product-description/${id}`, {
        headers: {
          'Content-Type': 'application/json',
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
    <form onSubmit={formik.handleSubmit} style={{ padding: 20 }}>
      <div>
        <TextField
          name="productTitle"
          label="Product Title"
          value={formik.values.productTitle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.productTitle && Boolean(formik.errors.productTitle)}
          helperText={formik.touched.productTitle && formik.errors.productTitle}
        />
      </div>
      <div>
        <TextField
          name="price"
          label="Price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
      </div>
      <div>
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
      </div>
      {/* Add more fields as needed */}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default ProductEditForm;