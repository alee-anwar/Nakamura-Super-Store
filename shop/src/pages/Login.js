import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useTranslation } from "react-i18next";

const Login = ({  setIsAuthenticated }) => {
  const { t } = useTranslation();
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [showPhoneNoInput, setShowPhoneNoInput] = useState(true);
  const [resMsg, setResMsg] = useState("");
  const [phoneNo, setPhoneNo] = useState(0);
  const navigate = useNavigate();

  // Define validation schema for phone number
  // const validationSchemaPhone = Yup.object().shape({
  //   phoneNo: Yup.string()
  //     .matches(
  //       /^(\+923|03)\d{9}$/,
  //       "Phone number must start with '+923' or '03' and have 9 digits after that"
  //     )
  //     .required("Phone number is required"),
  // });

  const validationSchemaPhone = Yup.object().shape({
    phoneNo: Yup.string()
      .matches(
        /^\+923\d{9}$/,
        "Phone number must start with '+923' and have 9 digits after that"
      )
      .required("Phone number is required"),
  });

  // Define validation schema for OTP code
  const validationSchemaCode = Yup.object({
    otp: Yup.string()
      .matches(/^\d{6}$/, t("OTP must be a 6-digit number"))
      .required(t("OTP is required")),
  });

  const formikPhone = useFormik({
    initialValues: {
      phoneNo: "",
    },
    validationSchema: validationSchemaPhone,
    onSubmit: async (value) => {
      console.log("phone  " + value.phoneNo);
      try {
        const response = await axios.post(
          "http://localhost:3000/authUser/customer-send-otp",
          value
        );
        console.log("Response" + response.data);
        // console.log("Message" + response.data.message);

        switch (response.data) {
          case "otp has been successfully sent to the give number":
            setShowOtpVerification(true);
            setShowPhoneNoInput(false);
            setPhoneNo(value.phoneNo);
            break;

          case "Please register your account first":
            navigate("/account/signup");
            break;

          default:
            // Handle other response cases if needed
            break;
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  // useEffect(() => {
  //   if (resMsg === "Please register your account first") {
  //   }
  // }, [resMsg, navigate]);

  const formikCode = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: validationSchemaCode, // Make sure this is defined correctly
    onSubmit: async (value) => {
      try {
        const loginData = {
          otpByUser: value.otp,
          phoneNo: phoneNo,
        };

        const response = await axios.post(
          "http://localhost:3000/authUser/customer-login",
          loginData
        );
        // if (response.status === 200) {
        // Successful response
        console.log("OTP console: " + response.data.message);

        // Save the token and userInfo in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "userInfo",
          JSON.stringify(response.data.userInfo)
        );

        if (
          response.data.message ===
          "Congratulations! You have been successfully logged in"
        ) {
          console.log("cart" + cartItems);
          cartItems && cartItems.length > 0
            ? navigate("/checkout")
            : navigate("/account");
          // Handle the response data as needed
          // navigate("/account");
          setIsAuthenticated(true);
        } else {
          console.log("Error: " + response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const cartItems = JSON.parse(localStorage.getItem("cartItems"));

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <BreadcrumbsComponent name={t("Login")} path={"/account/login"} />
      <Typography variant="h1" my={2}>
        {t("Login")}
      </Typography>
      <Container maxWidth="md">
        {showPhoneNoInput ? (
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
                {t("Hi, WE need your phone number to verify your identity")}
              </Typography>

              <Box my={2}>
                <Paper
                  sx={{ width: 400, py: 1, px: 2, borderRadius: 3 }}
                  variant="outlined"
                >
                  <InputBase
                    placeholder={"+923*********"}
                    name="phoneNo"
                    value={formikPhone.values.phoneNo}
                    onChange={formikPhone.handleChange}
                    onBlur={formikPhone.handleBlur}
                    fullWidth
                  />
                </Paper>
                {formikPhone.touched.phoneNo && formikPhone.errors.phoneNo ? (
                  <Typography variant="caption" color="error">
                    {formikPhone.errors.phoneNo}
                  </Typography>
                ) : null}
              </Box>
              <Stack width="250px" mb={1}>
                <Button
                  variant="contained"
                  sx={{ mt: 1 }}
                  fullWidth
                  type="submit"
                >
                  {t("Use SMS")}
                </Button>
                <Button variant="contained" sx={{ mt: 1 }} disabled>
                  {t("Use Call")}
                </Button>
              </Stack>
              <Typography variant="caption" color="textSecondary">
                {t(
                  "*You will reveive a call/sms shortly. Existing users will log in right after verifying the confirmation code"
                )}
              </Typography>
            </Box>
          </form>
        ) : (
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
                {t("Enter the code sent to your phone")}
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
                type="submit"
                // onClick={handleVerifyClick}
              >
                {t("Verify")}
              </Button>
            </Box>
          </form>
        )}
      </Container>
    </Container>
  );
};

export default Login;

// cartItems && cartItems.length > 0
// ? navigate("/checkout")
// : navigate("/account");
// Handle the response data as needed
