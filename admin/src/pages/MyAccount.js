import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyAccount = ({ user }) => {
  const [accountDetails, setAccountDetails] = useState({});
  const theme = useTheme();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // navigate('/login')
    window.location.href = "/login";
  };
  console.log("account" + user[0].firstName);
  // useEffect(() => {
  //   axios.get('http://localhost:8000/admin')
  //     .then(response => setAccountDetails(response.data))
  //     // .catch(error => console.log(error));
  // }, []);

  // const handleChange = (event) => {
  //   setAccountDetails({ ...accountDetails, [event.target.firstname]: event.target.value });
  // };
  return (
    <Box>
      <Box sx={theme.mixins.toolbar} />
      <Typography sx={{ flexGrow: 1, mb: 4 }} variant="h1">
        My Account
      </Typography>
      <Box>
        <Paper sx={{ height: "auto", width: "100%", mt: 2 }}>
          <Grid container p={5}>
            <Grid item md={6}>
              <Box component="form" noValidate autoComplete="off">
                <Grid container spacing={2}>
                  {/* <Grid item md={6}>
                    <TextField
                      size="small"
                      label="First Name"
                      fullWidth
                      value={user[0]?.firstName}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      // onChange={handleChange}
                    ></TextField>
                  </Grid> */}
                  <Grid item md={6}>
                    <TextField
                      size="small"
                      label="User Name"
                      fullWidth
                      value={user[0]?.userName}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      // onChange={handleChange}
                      // onChange={(e) => setQuantity(e.target.value)}
                    ></TextField>
                  </Grid>

                  <Grid item md={6}>
                    {/* <Stack spacing={2}> */}
                    <TextField
                      size="small"
                      label="Email"
                      value={user[0]?.email}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    ></TextField>

                    {/* </Stack> */}
                  </Grid>
                  <Grid item md={6}>
                    {/* <Stack spacing={2}> */}
                    <TextField
                      size="small"
                      label="Phone"
                      value={accountDetails.phone}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    ></TextField>

                    {/* </Stack> */}
                  </Grid>
                </Grid>
                <Button type="submit" variant="contained" sx={{ mt: 5 }}>
                  Save Changes
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              md={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "auto",
              }}
            >
              <Avatar
                alt="User Profile Picture"
                sx={{ width: 175, height: 175 }}
              />
            </Grid>
          </Grid>
          <Divider />
          <Grid container p={5} spacing={3}>
            <Grid item md={3}>
              <Paper sx={{ backgroundColor: "#f7f7f7", p: 1 }}>
                <Stack direction="row" sx={{ alignItems: "center" }}>
                  <Typography
                    sx={{
                      color: "black",
                      borderColor: "black",
                      fontWeight: "700",
                      flexGrow: 1,
                    }}
                  >
                    Password
                  </Typography>
                  <Button sx={{ color: "black", py: 0.1, px: 1 }}>
                    Change
                  </Button>
                </Stack>
                <Typography
                  sx={{
                    backgroundColor: "inherit",
                    fontSize: 12,
                    lineHeight: 0,
                  }}
                  variant="body"
                  color="textSecondary"
                >
                  You can reset or change your password by clicking here
                </Typography>
              </Paper>
            </Grid>
            <Grid item md={3}>
              <Paper sx={{ backgroundColor: "#f7f7f7", p: 1 }}>
                <Stack direction="row" sx={{ alignItems: "center" }}>
                  <Typography
                    sx={{ color: "black", fontWeight: "700", flexGrow: 1 }}
                  >
                    Remove Account
                  </Typography>
                  <Button
                    sx={{ color: "red", py: 0.1, px: 1, borderColor: "error" }}
                  >
                    Deactivate
                  </Button>
                </Stack>
                <Typography
                  sx={{
                    backgroundColor: "inherit",
                    fontSize: 12,
                    lineHeight: 0,
                  }}
                  variant="body"
                  color="textSecondary"
                >
                  Once you delete your account, there is no going back, please
                  be certain.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Box px={5} pb={6}>
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default MyAccount;
