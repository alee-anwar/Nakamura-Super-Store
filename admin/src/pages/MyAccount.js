import React from "react";
import {
    Avatar,
  Button,
  Container,
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

const MyAccount = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/login')
  }
  return (
    <Box>
      <Box sx={theme.mixins.toolbar} />
      <Typography sx={{ flexGrow: 1, mb: 4 }} variant="h1">
        My Account
      </Typography>
      <Box>
        <Paper sx={{ height: "auto", width: "100%", mt: 2 }}>
          <Grid container p={5}>
            <Grid md={6}>
              <Box component="form" noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <TextField
                      size="small"
                      label="First Name"
                      fullWidth
                    ></TextField>
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      size="small"
                      label="Last Name"
                      fullWidth
                    ></TextField>
                  </Grid>

                  <Grid item md={6}>
                    <Stack spacing={2}>
                      <TextField size="small" label="Email"></TextField>
                      <TextField size="small" label="Phone"></TextField>
                    </Stack>
                  </Grid>
                </Grid>
                <Button variant="contained" sx={{ mt: 5 }}>
                  Save Changes
                </Button>
              </Box>
            </Grid>
            <Grid
              md={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "auto",
              }}
            >
              <Avatar alt="User Profile Picture" sx={{ width: 175, height: 175 }} />

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
                  component="body2"
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
                    sx={{ color: "red", py: 0.1, px: 1 }}
                    borderColor="error"
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
                  component="body2"
                  color="textSecondary"
                >
                  Once you delete your account, there is no going back, please
                  be certain.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Box px={5} pb={6}>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default MyAccount;
