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
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

const CreateProduct = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [id, setID] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [tag, setTag] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [idError, setIDError] = useState(false);
  const [desError, setDesError] = useState(false);

  const [priceError, setPriceError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const [categoryError, setCategoryError] = useState(false);
  const [subcategoryError, setSubCategoryError] = useState(false);

  const body = {
    title,
    id,
    description,
    category,
    price,
    status,
    date,
    subcategory,
    color,
    tag,
    image,
    quantity,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setIDError(false);
    setDesError(false);
    setCategoryError(false);
    setSubCategoryError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (id === "") {
      setIDError(true);
    }
    if (description === "") {
      setDesError(true);
    }
    if (category === "") {
      setCategoryError(true);
    }
    if (price === "") {
      setPriceError(true);
    }
    if (status === "") {
      setStatusError(true);
    }
    if (date === "") {
      setDateError(true);
    }

    if (title && description && category) {
      // fetch("http://localhost:8000/products", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(body),
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error("Network response was not ok");
      //     }
      //     return response.json();
      //   })
      //   .then((body) => {
      //     console.log("Data posted:", body);
      //   })
      //   .then(() => navigate("/products"))
      //   .catch((error) => {
      //     console.error("Error posting data:", error);
      //   });
      axios
        .post("http://localhost:8000/products", body, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Data posted:", response.data);
          navigate("/products");
        })
        .catch((error) => {
          console.error("Error posting data:", error);
        });
    }
  };

  return (
    <Box maxWidth={"md"} ml={20} mb={3}>
      <Box sx={theme.mixins.toolbar} />
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
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
          <Button type="submit" variant="contained">
            Publish Now
          </Button>
        </Box>

        <Grid container spacing={2} display="flex" wrap>
          <Grid container item spacing={2} direction="row" md={8}>
            <Grid item>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <Typography color="textSecondary">Producut Details</Typography>
                <Grid container columnSpacing={2}>
                  <Grid item md={6}>
                    <TextField
                      margin="dense"
                      label="SKU"
                      fullWidth
                      size="small"
                      required
                      error={idError}
                      onChange={(e) => setID(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      margin="dense"
                      label="Quantity"
                      fullWidth
                      size="small"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      margin="dense"
                      label="Title"
                      fullWidth
                      size="small"
                      required
                      error={titleError}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Grid>

                  <Grid item md={6}>
                    <TextField
                      margin="dense"
                      label="Color"
                      fullWidth
                      size="small"
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      margin="dense"
                      label="Tag"
                      fullWidth
                      size="small"
                      onChange={(e) => setTag(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      margin="dense"
                      label="Price"
                      fullWidth
                      size="small"
                      required
                      error={priceError}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={6}>
                    {/* <InputLabel id="status-label">Status</InputLabel> */}
                    <TextField
                      select
                      label="Status"
                      id="status"
                      value={status}
                      error={statusError}
                      onChange={(e) => setStatus(e.target.value)}
                      fullWidth
                      size="small"
                      required
                      margin="dense"
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value={"Activate"}>Activate</MenuItem>
                      <MenuItem value={"Deactivate"}>Deactivate</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                        sx={{
                          width: "100%",
                          marginTop: 1,
                          "& .MuiInputBase-input.MuiOutlinedInput-input": {
                            paddingTop: "8.5px",
                            paddingBottom: "8.5px",
                          },
                        }}
                      />
                    </LocalizationProvider>
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
                  rows={7}
                  required
                  error={desError}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Paper>
            </Grid>
            <Grid item md={12}>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <Typography color="textSecondary">Images</Typography>
                <TextField
                  margin="dense"
                  label="URL"
                  fullWidth
                  size="small"
                  onChange={(e) => setImage(e.target.value)}
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid container item spacing={2} direction="column" md={4}>
            <Grid item>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <FormControl required error={categoryError}>
                  <FormLabel>Category</FormLabel>
                  <FormGroup
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <FormControlLabel
                      value="Biscuits"
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
                      value="Beverages"
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
                    <FormControlLabel
                      value="Candy & Chocolate"
                      control={
                        <Checkbox
                          size="small"
                          disableRipple={true}
                          sx={{ color: "#757575" }}
                        />
                      }
                      label={
                        <Typography sx={{ color: "#757575" }}>
                          Candy & Chocolate
                        </Typography>
                      }
                      sx={{ mb: -1 }}
                    />
                    <FormControlLabel
                      value="Chips & Pretzels"
                      control={
                        <Checkbox
                          size="small"
                          disableRipple={true}
                          sx={{ color: "#757575" }}
                        />
                      }
                      label={
                        <Typography sx={{ color: "#757575" }}>
                          Chips & Pretzels
                        </Typography>
                      }
                      sx={{ mb: -1 }}
                    />
                    <FormControlLabel
                      value="Food"
                      control={
                        <Checkbox
                          size="small"
                          disableRipple={true}
                          sx={{ color: "#757575" }}
                        />
                      }
                      label={
                        <Typography sx={{ color: "#757575" }}>Food</Typography>
                      }
                      sx={{ mb: -1 }}
                    />
                    <FormControlLabel
                      value="Meat & Fish"
                      control={
                        <Checkbox
                          size="small"
                          disableRipple={true}
                          sx={{ color: "#757575" }}
                        />
                      }
                      label={
                        <Typography sx={{ color: "#757575" }}>
                          Meat & Fish
                        </Typography>
                      }
                      sx={{ mb: -1 }}
                    />
                    <FormControlLabel
                      value="Snacks"
                      control={
                        <Checkbox
                          size="small"
                          disableRipple={true}
                          sx={{ color: "#757575" }}
                        />
                      }
                      label={
                        <Typography sx={{ color: "#757575" }}>
                          Snacks
                        </Typography>
                      }
                      sx={{ mb: -1 }}
                    />
                  </FormGroup>
                </FormControl>
              </Paper>
            </Grid>

            <Grid item>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <FormLabel>Sub Category</FormLabel>
                <FormGroup
                  value={category}
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  <FormControlLabel
                    value="Baking Needs"
                    control={
                      <Checkbox
                        size="small"
                        disableRipple={true}
                        sx={{ color: "#757575" }}
                      />
                    }
                    label={
                      <Typography sx={{ color: "#757575" }}>
                        Baking Needs
                      </Typography>
                    }
                    sx={{ mb: -1 }}
                  />
                  <FormControlLabel
                    value="Baby Food"
                    control={
                      <Checkbox
                        size="small"
                        disableRipple={true}
                        sx={{ color: "#757575" }}
                      />
                    }
                    label={
                      <Typography sx={{ color: "#757575" }}>
                        Baby Food
                      </Typography>
                    }
                    sx={{ mb: -1 }}
                  />
                  <FormControlLabel
                    value="Baby Care"
                    control={
                      <Checkbox
                        size="small"
                        disableRipple={true}
                        sx={{ color: "#757575" }}
                      />
                    }
                    label={
                      <Typography sx={{ color: "#757575" }}>
                        Baby Care
                      </Typography>
                    }
                    sx={{ mb: -1 }}
                  />
                  <FormControlLabel
                    value="Canned Foods"
                    control={
                      <Checkbox
                        size="small"
                        disableRipple={true}
                        sx={{ color: "#757575" }}
                      />
                    }
                    label={
                      <Typography sx={{ color: "#757575" }}>
                        Canned Foods
                      </Typography>
                    }
                    sx={{ mb: -1 }}
                  />
                  <FormControlLabel
                    value="Butter & Sour Cream"
                    control={
                      <Checkbox
                        size="small"
                        disableRipple={true}
                        sx={{ color: "#757575" }}
                      />
                    }
                    label={
                      <Typography sx={{ color: "#757575" }}>
                        Butter & Sour Cream
                      </Typography>
                    }
                    sx={{ mb: -1 }}
                  />
                  <FormControlLabel
                    value="Instant Foods"
                    control={
                      <Checkbox
                        size="small"
                        disableRipple={true}
                        sx={{ color: "#757575" }}
                      />
                    }
                    label={
                      <Typography sx={{ color: "#757575" }}>
                        Instant Foods
                      </Typography>
                    }
                    sx={{ mb: -1 }}
                  />
                  <FormControlLabel
                    value="Meat"
                    control={
                      <Checkbox
                        size="small"
                        disableRipple={true}
                        sx={{ color: "#757575" }}
                      />
                    }
                    label={
                      <Typography sx={{ color: "#757575" }}>Meat</Typography>
                    }
                    sx={{ mb: -1 }}
                  />
                  <FormControlLabel
                    value="Liquid & UHT Milk"
                    control={
                      <Checkbox
                        size="small"
                        disableRipple={true}
                        sx={{ color: "#757575" }}
                      />
                    }
                    label={
                      <Typography sx={{ color: "#757575" }}>
                        Liquid & UHT Milk
                      </Typography>
                    }
                    sx={{ mb: -1 }}
                  />
                </FormGroup>
                <FormControlLabel
                  value="Mineral Water"
                  control={
                    <Checkbox
                      size="small"
                      disableRipple={true}
                      sx={{ color: "#757575" }}
                    />
                  }
                  label={
                    <Typography sx={{ color: "#757575" }}>
                      Mineral Water
                    </Typography>
                  }
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  value="Oral Care"
                  control={
                    <Checkbox
                      size="small"
                      disableRipple={true}
                      sx={{ color: "#757575" }}
                    />
                  }
                  label={
                    <Typography sx={{ color: "#757575" }}>Oral Care</Typography>
                  }
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  value="Pulses & Chickpeas"
                  control={
                    <Checkbox
                      size="small"
                      disableRipple={true}
                      sx={{ color: "#757575" }}
                    />
                  }
                  label={
                    <Typography sx={{ color: "#757575" }}>
                      Pulses & Chickpeas
                    </Typography>
                  }
                  sx={{ mb: -1 }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CreateProduct;