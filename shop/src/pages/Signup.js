import React, { useEffect, useState } from "react";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  // lastName: Yup.string().required("Last name is required"),
  // email: Yup.string().email("Invalid email").required("Email is required"),
  // password: Yup.string().required("Password is required"),
  phoneNo: Yup.string().required("Phone number is required"),
  town: Yup.string().required("Town name is required"),
  streetNo: Yup.number().required("Street number is required"),
  houseNo: Yup.string().required("House number is required"),
  // age: Yup.number().positive("Invalid age").required("Age is required"),
});

const Signup = () => {
  const [resMsg, setResMsg] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      // lastName: "",
      // email: "",
      // password: "",
      phoneNo: "",
      town: "",
      streetNo: "",
      houseNo: "",
      // age: "",
      // image: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/authUser/customer-signup",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.message);
        setResMsg(response.data.message);

        // Handle success or redirect
      } catch (error) {
        console.error(error);
        // Handle error
      }
    },
  });

  useEffect(() => {
    if (resMsg === "Customer has been registered successfully.") {
      navigate("/account/login");
    }
  }, [resMsg]);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <BreadcrumbsComponent name={"Sign Up"} path={"/account/signup"} />
      <Typography variant="h1" my={2}>
        Sign Up
      </Typography>
      <Container maxWidth="sm">
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <TextField
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                fullWidth

              />
            </Grid>

            <Grid item sm={12} md={6}>
              <TextField
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                fullWidth
              />
            </Grid>

            {/* <TextField
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          /> */}
            <Grid item sm={12} md={6}>
              <TextField
                id="phoneNo"
                name="phoneNo"
                label="Phone Number"
                value={formik.values.phoneNo}
                onChange={formik.handleChange}
                error={formik.touched.phoneNo && Boolean(formik.errors.phoneNo)}
                helperText={formik.touched.phoneNo && formik.errors.phoneNo}
                fullWidth
              />
            </Grid>

            <Grid item sm={12} md={6}>
              <TextField
                id="town"
                name="town"
                label="Town"
                value={formik.values.town}
                onChange={formik.handleChange}
                error={formik.touched.town && Boolean(formik.errors.town)}
                helperText={formik.touched.town && formik.errors.town}
                fullWidth
              />
            </Grid>

            <Grid item sm={12} md={6}>
              <TextField
                id="streetNo"
                name="streetNo"
                label="Street Number"
                value={formik.values.streetNo}
                onChange={formik.handleChange}
                error={
                  formik.touched.streetNo && Boolean(formik.errors.streetNo)
                }
                helperText={formik.touched.streetNo && formik.errors.streetNo}
                fullWidth
              />
            </Grid>

            <Grid item sm={12} md={6}>
              <TextField
                id="houseNo"
                name="houseNo"
                label="House Number"
                value={formik.values.houseNo}
                onChange={formik.handleChange}
                error={formik.touched.houseNo && Boolean(formik.errors.houseNo)}
                helperText={formik.touched.houseNo && formik.errors.houseNo}
                fullWidth
              />
            </Grid>

            {/* <TextField
            id="image"
            name="image"
            label="Image URL"
            value={formik.values.image}
            onChange={formik.handleChange}
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={formik.touched.image && formik.errors.image}
          /> */}
            <Grid item sm={12} md={12} display='flex' justifyContent='center'>
              <Button type="submit" variant="contained" size='medium' sx={{width: 200, height: 40}}>
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Container>
  );
};

export default Signup;
