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

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export default function SignUp() {
  const navigate = useNavigate();
  // const [isSubmitting, setIsSubmitting] = React.useState(false);
  // const [submitting, setSubmitting] = React.useState(false);

  // const [formData, setFormData] = React.useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // handleInputChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSignUp = async (values) => {
    // e.preventDefault();
    // setIsLoading(true);
    setErrorMsg("");

    // try {
      // Check if user already exists
      // const response = await axios.post('/api/check-email', {
      //   email: formData.email,
      // });
      // if (response.data.message === 'Email already exists') {
      //   // email already exists, display error message to user
      // } else {
      //   // email is available, continue with signup process
      // }

      // const res = await axios.get(`http://localhost:3000/authUser/signup=${values.email}`);
      // if (res.data.length > 0) {
      //   setErrorMsg("User already exists with this email");
      //   setIsLoading(false);
      //   return;
      // }
      // Create user if not already exists
    //   await axios.post("http://localhost:3000/authUser/signup", values);
    //   navigate("/login");
    // } catch (err) {
    //   console.error(err);
    //   setErrorMsg("Signup failed. Please try again later.");
    // } finally {
    //   setIsLoading(false);
    // }

    try {
      const response = await axios
        .post("http://localhost:3000/authUser/signup", values)
        .then((response) => {
          console.log(response);
          alert("Signup successful!");
          // navigate("/login");
        })
        .catch((error) => {
          console.error(error);
          alert("Signup failed.");
          setIsLoading(true);
        })
        .finally(() => {
          setIsLoading(true);
          // setSubmitting(false);
        });
    } catch (error) {
      console.log(error);
    }
  }
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      console.log(values);
      handleSignUp();
      // navigate("/login");
      // setTimeout(() => {
      // setIsSubmitting(false);
      // navigate("/login");
      // }, 2000);
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="img" src={Logo} sx={{ height: 50, mb: 1 }} />
        <Typography variant="h1">Sign up</Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                name="lastName"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                name="email"
                required
                fullWidth
                id="email"
                label="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                name="password"
                required
                fullWidth
                type="password"
                id="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                name="confirmPassword"
                required
                fullWidth
                type="password"
                id="confirmPassword"
                label="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ my: 2 }}
                // disabled={isSubmitting}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign Up"
                )}
              </Button>
              {errorMsg && (
                <Typography color="error" variant="subtitle2" gutterBottom>
                  {errorMsg}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
