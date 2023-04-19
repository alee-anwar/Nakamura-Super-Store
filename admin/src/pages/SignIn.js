import * as React from "react";
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
import PropTypes from 'prop-types';

const validationSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().required("Required"),
});

export default function SignIn({setToken}) {
  // const navigate = useNavigate();

  const handleSignIn = async (values) => {
   
    try {
      const response =  await axios.post("http://localhost:3000/authUser/login", {
        email: values.email,
        password: values.password,
      });
      // console.log("handlesignin clicked")
      console.log(response); // log the response object
      localStorage.setItem("token", response.data.token);
      // setToken(response.data.token)
      // console.log(response.data.token)
      // navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: 
    (values) => {
      // console.log(values);
      handleSignIn(values);
      // navigate("/dashboard");
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
        <Box component="form" onSubmit={formik.handleSubmit} noValidate autoComplete="off" sx={{ mt: 1 }}>
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            // autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

SignIn.propTypes = {
  setToken: PropTypes.func.isRequired
}