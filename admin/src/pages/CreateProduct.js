import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CreateProduct = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [sku, setSku] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [skuError, setSkuError] = useState(false);
  const [desError, setDesError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  return (
    <Box maxWidth={"md"} ml={20} mb={3}>
      <Box sx={theme.mixins.toolbar} />
      <Box
        component="form"
        size="small"
        sx={{
          "& .MuiTextField-root": { mt: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <Box sx={{ display: "flex" }} mb={3}>
          <Typography sx={{ flexGrow: 1 }} variant="h1">
            Add Product
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "white", color: "black", mr: 2 }}
            disabled
          >
            Save To Draft
          </Button>
          <Button variant="contained">Publish Now</Button>
        </Box>

        <Grid container spacing={2} display="flex" wrap>
          <Grid container item spacing={2} direction="row" md={8}>
            <Grid item>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <Typography color="textSecondary">Producut Details</Typography>
                <Grid container columnSpacing={2}>
                  <Grid item md={12}>
                    <TextField
                      margin="dense"
                      label="Title"
                      fullWidth
                      size="small"
                      required
                      error={titleError}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      margin="dense"
                      label="SKU"
                      fullWidth
                      size="small"
                      required
                      error={skuError}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item md={12}>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <Typography color="textSecondary">Description</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  required
                  error={desError}
                />
              </Paper>
            </Grid>
            <Grid item md={12}>
              <Paper elevation={3} sx={{ p: 3, height: "200px" }}>
                <Typography color="textSecondary">Images</Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid container item spacing={2} direction="column" md={4}>
            <Grid item>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <FormControl required error={categoryError}>
                  <FormLabel>Category</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      value="biscuits"
                      control={
                        <Checkbox
                          size="small"
                          disableRipple={true}
                          sx={{ color: "#757575" }}
                        />
                      }
                      label={
                        <Typography sx={{ color: "#757575" }}>
                          Biscuits
                        </Typography>
                      }
                      sx={{ mb: -1 }}
                    />
                    <FormControlLabel
                      value="beverages"
                      control={
                        <Checkbox
                          size="small"
                          disableRipple={true}
                          sx={{ color: "#757575" }}
                        />
                      }
                      label={
                        <Typography sx={{ color: "#757575" }}>
                          Beverages
                        </Typography>
                      }
                      sx={{ mb: -1 }}
                    />
                  </FormGroup>
                </FormControl>
              </Paper>
            </Grid>

            <Grid item>
              <Paper elevation={3} sx={{ p: 3, height: "300px" }}>
                <Typography color="textSecondary">Sub Category</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CreateProduct;
