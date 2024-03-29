import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import ProductCard from "../components/ProductCard";
// import FilterSidebar from "../components/FilterSidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useTranslation } from "react-i18next";

const Shop = ({
  cartItems,
  setCartItems,
  totalCost,
  setTotalCost,
  wishlist,
  setWishlist,
}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState(""); // State for sorting order
  const [loading, setLoading] = useState(true); // Loading state
  const { t } = useTranslation();

  const { value } = useParams(); // Get the product ID from the URL params
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    console.log("get");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/productList/viewProducts"
        );
        setProducts(response.data);
        console.log(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        // setError(error.message);
        setLoading(false); // Set loading to false if an error occurs
      }
    };

    fetchData();
  }, []);

  console.log(products);

  useEffect(() => {
    console.log("category");
    // Filter the products based on the selected category (if any)
    const filteredData = value
      ? products.filter((product) => product.category === value)
      : [];
    setFilteredProducts(filteredData);
  }, [value, products]);

  useEffect(() => {
    // Sort the products based on the selected sort order
    let sortedProducts = [];

    if (filteredProducts.length > 0) {
      sortedProducts = [...filteredProducts];
    } else {
      sortedProducts = [...products];
    }

    if (sortOrder === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else {
      sortedProducts = 0;
    }

    // setFilteredProducts(sortedProducts);
    setFilteredProducts(
      sortedProducts.length > 0
        ? sortedProducts
        : filteredProducts.length > 0
        ? [...filteredProducts]
        : [...products]
    );
  }, [sortOrder]);

  const handleSortChange = (event) => {
    const selectedSortOrder = event.target.value;

    if (sortOrder === selectedSortOrder) {
      // If the clicked checkbox is already selected, uncheck both checkboxes
      setSortOrder("");
    } else {
      setSortOrder(selectedSortOrder);
    }
  };

  return (
    <Container maxWidth="lg" disableGutters sx={{ pt: 5 }}>
      <BreadcrumbsComponent name={t("Shop")} path={"/shop"} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box display="flex" alignItems="center">
            <Typography variant="h1" my={2} flexGrow={1}>
              {t('Shop')}
            </Typography>
            <Link to="#" onClick={handleGoBack} style={{ color: "#ffb800" }}>
              {t('Go Back')}
            </Link>
          </Box>
          <Grid container columns={12} spacing={2} my={2}>
            <Grid item xs={12} md={3} key="filter-sidebar">
              <Paper
                elevation={2}
                sx={{ padding: "16px", width: "auto", height: {xs: "auto", md:"60vh"}}}
              >
                <FormControl component="fieldset" p={2}>
                  <Typography variant="h6">{t('Price')}</Typography>

                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={sortOrder === "lowToHigh"}
                          onChange={handleSortChange}
                          value="lowToHigh"
                        />
                      }
                      label={t("Low to High")}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={sortOrder === "highToLow"}
                          onChange={handleSortChange}
                          value="highToLow"
                        />
                      }
                      label={t('High to Low')}
                    />
                  </FormGroup>
                </FormControl>
              </Paper>
            </Grid>
            <Grid container item xs={12} md={9}>
              <Grid container columns={12} spacing={1}>
                {filteredProducts.length > 0
                  ? filteredProducts.map((item) => (
                      <Grid item xs={6} sm={4} md={4} lg={3} key={item._id}>
                        <ProductCard
                          item={item}
                          cartItems={cartItems}
                          setCartItems={setCartItems}
                          wishlist={wishlist}
                          setWishlist={setWishlist}
                          totalCost={totalCost}
                          setTotalCost={setTotalCost}
                        />
                      </Grid>
                    ))
                  : products.map((item) => (
                      <Grid item xs={6} sm={4} md={4} lg={3} key={item._id}>
                        <ProductCard
                          cartItems={cartItems}
                          setCartItems={setCartItems}
                          wishlist={wishlist}
                          setWishlist={setWishlist}
                          item={item}
                          totalCost={totalCost}
                          setTotalCost={setTotalCost}
                        />
                      </Grid>
                    ))}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Shop;
