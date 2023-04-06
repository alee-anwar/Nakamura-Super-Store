import React, { useEffect, useState } from "react";
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
import { parseISO } from "date-fns";

const EditProduct = () => {
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

  useEffect(() => {
    setID(localStorage.getItem("id"));
    setTitle(localStorage.getItem("title"));
    setImage(localStorage.getItem("image"));
    setCategory(localStorage.getItem("category"));
    setPrice(localStorage.getItem("price"));
    setStatus(localStorage.getItem("status"));
    setSubCategory(localStorage.getItem("subcategory"));
    setColor(localStorage.getItem("color"));
    setQuantity(localStorage.getItem("quantity"));
    setDate(localStorage.getItem("date"));
    setTag(localStorage.getItem("tag"));
  }, []);

  const categories = [
    "Biscuits",
    "Beverages",
    "Candy & Chocolate",
    "Chips & Pretzels",
    "Food",
    "Meat & Fish",
    "Snacks",
  ];

  const subcategories = [
    { value: "Baking Needs", label: "Baking Needs" },
    { value: "Baby Food", label: "Baby Food" },
    { value: "Baby Care", label: "Baby Care" },
    { value: "Canned Foods", label: "Canned Foods" },
    { value: "Butter & Sour Cream", label: "Butter & Sour Cream" },
    { value: "Instant Foods", label: "Instant Foods" },
    { value: "Meat", label: "Meat" },
    { value: "Liquid & UHT Milk", label: "Liquid & UHT Milk" },
    { value: "Mineral Water", label: "Mineral Water" },
    { value: "Oral Care", label: "Oral Care" },
    { value: "Pulses & Chickpeas", label: "Pulses & Chickpeas" },
  ];

  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.value]: event.target.checked,
    });
  };

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
  // console.log(date);
  // const handleUpdate = (e) => {
  //   e.preventDefault();
  //   if (title && description && category) {
  //     axios
  //       .post("http://localhost:8000/products", body, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then((response) => {
  //         console.log("Data posted:", response.data);
  //         navigate("/products");
  //       })
  //       .catch((error) => {
  //         console.error("Error posting data:", error);
  //       });
  //   }
  // };

  const updateAPIData = () => {
    axios.put(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`, body)
    .then((response) => {
      console.log("Data Updated", response.data);
      navigate("/products")
    })
    .catch((error) => {
      console.log(error);
    });
  };
  return (
    <Box maxWidth={"md"} ml={20} mb={3}>
      <Box sx={theme.mixins.toolbar} />
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={updateAPIData}
      >
        <Box sx={{ display: "flex" }} mb={3}>
          <Typography sx={{ flexGrow: 1 }} variant="h1">
            Edit Product
          </Typography>
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </Box>
        <Grid container spacing={2} display="flex">
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
                      value={id}
                      onChange={(e) => setID(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      margin="dense"
                      label="Quantity"
                      fullWidth
                      size="small"
                      value={quantity}
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Grid>

                  <Grid item md={6}>
                    <TextField
                      margin="dense"
                      label="Color"
                      fullWidth
                      size="small"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      margin="dense"
                      label="Tag"
                      fullWidth
                      size="small"
                      value={tag}
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
                      value={price}
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
                        // value={date}
                        value={date ? parseISO(date) : null}
                        onChange={(e) => setDate(e.target.value)}
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
                  value={description}
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
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid container item spacing={2} direction="column" md={4}>
            <Grid item>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <FormControl required>
                  <FormLabel>Category</FormLabel>
                  <FormGroup
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <FormControlLabel
                        key={category}
                        value={category}
                        control={
                          <Checkbox
                            size="small"
                            disableRipple={true}
                            sx={{ color: "#757575" }}
                          />
                        }
                        label={
                          <Typography sx={{ color: "#757575" }}>
                            {category}
                          </Typography>
                        }
                        sx={{ mb: -1 }}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Paper>
            </Grid>

            <Grid item>
              <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                <FormLabel>Sub Category</FormLabel>
                <FormGroup
                  value={subcategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  {subcategories.map((subcategory, index) => (
                    <FormControlLabel
                      key={index}
                      value={subcategory.value}
                      control={
                        <Checkbox
                          size="small"
                          disableRipple={true}
                          sx={{ color: "#757575" }}
                          checked={checkedItems[subcategory.value] || false}
                          onChange={handleChange}
                        />
                      }
                      label={
                        <Typography sx={{ color: "#757575" }}>
                          {subcategory.label}
                        </Typography>
                      }
                      sx={{ mb: -1 }}
                    />
                  ))}
                </FormGroup>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EditProduct;
