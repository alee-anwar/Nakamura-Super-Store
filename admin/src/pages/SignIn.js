import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/blueicon.png";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import * as Yup from "yup";
import { Grid } from "@mui/material";

export default function SignIn() {
  const [signinError, setSigninError] = useState(null);
  const [signinSuccess, setSigninSuccess] = useState(false);


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      setSigninError(null);
      setSigninSuccess(false);
      // Perform additional validation if required
      // Example: Check if the email is already registered
      // If the validation passes, send the form data to the backend API
      axios
        .post("http://localhost:3000/authUser/login", values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          // store session information in local storage
          // setToken(response.data.token)
          localStorage.setItem("token", response.data.token);
          //  localStorage.setItem("user", JSON.stringif(response.data.user));

          window.location.href = "/dashboard";
        })
        .catch((error) => {
          // Handle error case
          // console.error("Signup error:", error);
          if (error.response) {
            // Request was made and server responded with a non-2xx status code
            setSigninError(error.response.data.message);
          } else if (error.request) {
            // Request was made but no response was received
            setSigninError("Network error. Please try again later.");
          } else {
            // Something else happened in making the request
            setSigninError("An error occurred. Please try again.");
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
        height: "75vh",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          // marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="img" src={Logo} sx={{ height: 50, mb: 1 }} />

        <Typography variant="h1">Sign in</Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12}>
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
            <Grid item xs={12} sm={12}>
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
            <Grid item xs={12} my={2}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
              {signinError && (
                <Typography variant="body2" color="error">
                  {signinError}
                </Typography>
              )}
              {signinSuccess && (
                <Typography variant="body2" color="success">
                  Signup successful!
                </Typography>
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
