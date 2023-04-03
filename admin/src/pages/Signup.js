import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/blueicon.png'

export default function SignUp() {
    const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
      <Container component="main" maxWidth="xs" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
      }}>
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
                  <Box component='img' src={Logo} sx={{height: 50, mb: 1}}/>
          <Typography variant="h1">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                size='small'
                //   autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                //   autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                size='small'
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                //   autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                size='small'
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                //   autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                size='small'
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                //   autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => navigate('/login')}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
  );
}