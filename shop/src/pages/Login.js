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


const Login = ({ cartItems, setIsAuthenticated }) => {
  const { t } = useTranslation();
  const [showSmsVerification, setShowSmsVerification] = useState(false);
  const [showPhoneNoInput, setShowPhoneNoInput] = useState(true);
  const [resMsg, setResMsg] = useState("");
  //   const [phoneNo, setPhoneNo] = useState("");
  const navigate = useNavigate();

  // const formikPhone = useFormik({
  //   initialValues: {
  //     phoneNo: "",
  //   },
  //   validationSchema: validationSchemaPhone,
  //   onSubmit: async (values) => {
  //     setShowPhoneNoInput(false);

  //     try {
  //       const response = await axios.post(
  //         "http://localhost:3000/authUser/customer-login",
  //         values
  //       );
  //       console.log(response);
  //       setIsAuthenticated(true);
  //       setShowSmsVerification(true);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  // });

  const validationSchemaPhone = Yup.object().shape({
    phoneNo: Yup.string()
      .matches(
        /^\+923\d{9}$/,
        t("Phone number must start with '+923' and have 12 digits")
      )
      .required(t("Phone number is required")),
  });
  
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
    onSubmit: async (values) => {
      setShowPhoneNoInput(false);
      try {
        const response = await axios.post(
          "http://localhost:3000/authUser/customer-login",
          values
        );
        console.log(response.data);
        setResMsg(response.data);
        // console.log("phone" + resMsg);
        // setIsAuthenticated(true);
        setShowSmsVerification(true);
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (resMsg === "Please register your account first") {
      navigate("/account/signup");
    }
  }, [resMsg]);

  const formikCode = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: validationSchemaCode,
    onSubmit: async (values) => {
      console.log("Before Try");
      console.log(values)

      try {
        const response = await axios.post(
          "http://localhost:3000/authUser/customer-send-otp", values
          // {
          //   otp: formikCode.values.otp,
          // }
        );

        console.log(response);
        const token = response.data.token;
        localStorage.setItem("token", token);
        console.log("After Try");
        // setIsAuthenticated(true)
        // navigate("/checkout")
        {
          token && setIsAuthenticated(true);
        }
        cartItems && cartItems.length > 0
          ? navigate("/checkout")
          : navigate("/account");
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleVerifyClick = async () => {
    if (formikCode.isValid) {
      console.log("handleVerify Clicked");
      formikCode.handleSubmit();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <BreadcrumbsComponent name={t("Login")} path={"/account/login"} />
      <Typography variant="h1" my={2}>
        {t('Login')}
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
                {t('Hi, WE need your phone number to verify your identity')}
              </Typography>

              <Box my={2}>
                <Paper
                  sx={{ width: 400, py: 1, px: 2, borderRadius: 3 }}
                  variant="outlined"
                >
                  <InputBase
                    placeholder={t("+923*********")}
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
                  {t('Use SMS')}
                </Button>
                <Button variant="contained" sx={{ mt: 1 }} disabled>
                  {t('Use Call')}
                </Button>
              </Stack>
              <Typography variant="caption" color="textSecondary">
                {t('*You will reveive a call/sms shortly. Existing users will log in right after verifying the confirmation code')}
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
                {t('Enter the code sent to your phone')}
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
                {t('Verify')}
              </Button>
            </Box>
          </form>
        )}
      </Container>
    </Container>
  );
};

export default Login;

// const handleVerifyClick = () => {
//   if (formikCode.isValid) {
//     // Perform OTP verification logic
//     setIsAuthenticated(true);
//     cartItems && cartItems.length > 0
//       ? navigate("/checkout")
//       : navigate("/account");
//   }
// };

// const handleVerifyClick = async () => {
//   if (formikCode.isValid) {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/authUser/customer-login",
//         {
//           otp: formikCode.values.otp,
//         }
//       );
//       // Handle the response or set any necessary state variables
//       setIsAuthenticated(true);
//       cartItems && cartItems.length > 0
//         ? navigate("/checkout")
//         : navigate("/account");
//     } catch (error) {
//       // Handle any errors
//       console.error(error);
//     }
//   }
// };

// const validationSchemaPhone = Yup.object().shape({
//   phoneNo: Yup.string()
//     .matches(
//       /^7\d{0,8}$/,
//       "Phone number must start with 7 and have maximum 9 digits"
//     )
//     .required("Phone number is required"),
// });

// const validationSchemaPhone = Yup.object().shape({
//   phoneNo: Yup.string()
//     .matches(
//       /^03\d{0,9}$/,
//       "Phone number must start with 03 and have maximum 10 digits"
//     )
//     .required("Phone number is required"),
// });
