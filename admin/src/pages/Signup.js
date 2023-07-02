import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/blueicon.png";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function SignUp() {
  const [signupError, setSignupError] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("User name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      setSignupError(null);
      setSignupSuccess(false);
      console.log(values);
      // Perform additional validation if required
      // Example: Check if the email is already registered
      // If the validation passes, send the form data to the backend API
      axios
        .post("http://localhost:3000/authUser/admin-signup", values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // Handle success case
          console.log("Signup success:", response.data);
          setSignupSuccess(true);
          resetForm();
          window.location.href = "/login";
        })
        .catch((error) => {
          // Handle error case
          // console.error("Signup error:", error);
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
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "85vh",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="img" src={Logo} sx={{ height: 50, mb: 1 }} />
        <Typography variant="h1">Sign up</Typography>
        {/* signup form */}
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="User Name"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.userName && formik.errors.userName}
                helperText={formik.touched.userName && formik.errors.userName}
                required
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                required
                type="email"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                required
                type="password"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                required
                type="password"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} my={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
              </Button>
              <Box py={1}>
                {signupError && (
                  <Typography variant="body2" color="error">
                    {signupError}
                  </Typography>
                )}
                {signupSuccess && (
                  <Typography variant="body2" color="success">
                    Signup successful!
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
