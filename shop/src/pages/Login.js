import React, { useState } from "react";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import {
  Box,
  Button,
  Container,
  InputBase,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, useFormik } from "formik";
import * as Yup from "yup";

const validationSchemaPhone = Yup.object().shape({
  phoneNo: Yup.string()
    .matches(
      /^7\d{0,8}$/,
      "Phone number must start with 7 and have maximum 9 digits"
    )
    .required("Phone number is required"),
});

// const validationSchemaCode = Yup.object({
//   otp: Yup.string()
//     .length(6, "OTP must be 6 digits")
//     .required("OTP is required"),
// });

const validationSchemaCode = Yup.object({
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be a 6-digit number")
    .required("OTP is required"),
});

const Login = ({ cartItems, setIsAuthenticated }) => {
  const [showSmsVerification, setShowSmsVerification] = useState(false);
  const [showPhoneNoInput, setShowPhoneNoInput] = useState(true);
  //   const [phoneNo, setPhoneNo] = useState("");
  const navigate = useNavigate();

  const formikPhone = useFormik({
    initialValues: {
      phoneNo: "",
    },
    validationSchema: validationSchemaPhone,
    onSubmit: (values) => {
      // Perform verification process and set isAuthenticated to true upon success
      setIsAuthenticated(true);
      setShowSmsVerification(true);
      setShowPhoneNoInput(false);
      //   {
      //     cartItems && cartItems.length > 0
      //       ? navigate("/checkout")
      //       : navigate("/account");
      //   }
    },
  });

  const formikCode = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: validationSchemaCode,
    onSubmit: (values) => {
      // Perform OTP verification logic
      // setIsAuthenticated(true);
      // navigate("/checkout");
      // handleVerifyClick
      // if (cartItems && cartItems.length > 0) {
      //   navigate("/checkout");
      // } else {
      //   navigate("/account");
      // }
    },
  });

  const handleVerifyClick = () => {
    if (formikCode.isValid) {
      // Perform OTP verification logic
      setIsAuthenticated(true);
      cartItems && cartItems.length > 0
        ? navigate("/checkout")
        : navigate("/account");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <BreadcrumbsComponent name={"Login"} path={"/login"} />
      <Typography variant="h1" my={2}>
        Login
      </Typography>
      <Container maxWidth="md">
        {showPhoneNoInput && (
          <form onSubmit={formikPhone.handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
                pb: 18,
              }}
            >
              <Typography variant="h6">
                Hi, WE need your phone number to verify your identity
              </Typography>

              <Box my={2}>
                <Paper
                  sx={{ width: 400, py: 1, px: 2, borderRadius: 3 }}
                  variant="outlined"
                >
                  <InputBase
                    placeholder="7********"
                    name="phoneNo"
                    value={formikPhone.values.phoneNo}
                    onChange={formikPhone.handleChange}
                    onBlur={formikPhone.handleBlur}
                    fullWidth
                    // value={phoneNo}
                    // onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </Paper>
                {formikPhone.touched.phoneNo && formikPhone.errors.phoneNo ? (
                  <Typography variant="caption" color="error">
                    {formikPhone.errors.phoneNo}
                  </Typography>
                ) : null}
                {/* <Typography variant="caption" color="textSecondary">
                  Phone number must be start with 7
                </Typography> */}
              </Box>
              <Stack width="250px" mb={1}>
                <Button
                  variant="contained"
                  sx={{ mt: 1 }}
                  //   onClick={handleSmsVerification}
                  fullWidth
                  type="submit"
                >
                  Use SMS
                </Button>
                <Button variant="contained" sx={{ mt: 1 }} disabled>
                  Use Call
                </Button>
              </Stack>
              <Typography variant="caption" color="textSecondary">
                *You will reveive a call/sms shortly. Existing users will log in
                right after verifying the confirmation code
              </Typography>
            </Box>
          </form>
        )}

        {showSmsVerification && (
          <form onSubmit={formikCode.handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
                pb: 18,
              }}
            >
              <Typography variant="h6" color="textSecondary" mb={2}>
                Enter the code sent to your phone
              </Typography>
              <Box my={2}>
                <Paper
                  sx={{ width: 400, py: 1, px: 2, borderRadius: 3 }}
                  variant="outlined"
                >
                  <InputBase
                    placeholder="******"
                    name="otp"
                    value={formikCode.values.otp}
                    onChange={formikCode.handleChange}
                    onBlur={formikCode.handleBlur}
                    fullWidth
                  />
                </Paper>
                {formikCode.touched.otp && formikCode.errors.otp ? (
                  <Typography variant="caption" color="error">
                    {formikCode.errors.otp}
                  </Typography>
                ) : null}
              </Box>
              <Button
                variant="contained"
                sx={{ mt: 1 }}
                onClick={handleVerifyClick}
              >
                Verify
              </Button>
            </Box>
          </form>
        )}
      </Container>
    </Container>
  );
};

export default Login;
