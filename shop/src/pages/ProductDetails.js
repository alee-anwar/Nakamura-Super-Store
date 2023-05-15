import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import { AddShoppingCart, Favorite } from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import ShareIcon from "@mui/icons-material/Share";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddToCartBtn from "../components/reuseableComponents/AddToCartBtn";
import WishlistBtn from "../components/reuseableComponents/WishlistBtn";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";

const ProductDetails = ({
  setCartItems,
  cartItems,
  setTotalCost,
  wishlist,
  setWishlist,
}) => {
  const singleProduct = {
    _id: 997713,
    quantity: 1,
    productTitle: "Father’s Day Gift for Brothers",
    image: "https://spoonacular.com/productImages/997713-312x231.jpeg",
    imageType: "jpeg",
    price: "$9.99",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor sem id erat tristique pharetra. Fusce luctus, odio sit amet viverra gravida, justo nisi aliquam nunc, eu hendrerit magna elit et nisi. Quisque bibendum purus eu nunc vestibulum interdum. Nulla consequat tortor non magna volutpat, ut hendrerit lectus pulvinar. Proin finibus velit nec nunc auctor, vitae mattis neque sollicitudin.",
    reviews: [
      {
        id: 1,
        title: "Great product",
        body: "This is a great product. I would definitely recommend it to others.",
      },
      {
        id: 2,
        title: "Not as advertised",
        body: "The product was not as advertised. It was much smaller than I expected.",
      },
      {
        id: 3,
        title: "Good value",
        body: "This is a good value for the price. I am very happy with my purchase.",
      },
    ],
  };

  // const [product, setProduct] = useState(singleProduct);
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const params = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/productList/product-description/${params.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setProduct(response.data.productdescription);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  //   const handleQuantityChange = (event) => {
  //     setProduct({ ...product, quantity: event.target.value });
  //   };
  const handleQuantityChange = (event) => {
    const value = event.target.value;
    // Check if value is a number greater than 0
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleExpand = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleCopyLink = () => {
    const link = navigator.clipboard.writeText(window.location.href);
    alert(`Link copied! ${link}`);
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 5 }}>
      <BreadcrumbsComponent name={"Product"} path={"/productdetails"} />
      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} sm={7} md={7}>
          <Box px={{ md: 8 }}>
            <img
              src={product.image}
              alt={product.title}
              width="100%"
              height="auto"
            />
          </Box>
        </Grid>

        {/* Product details */}
        <Grid item xs={12} sm={5} md={5} mb={5}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="body1" fontWeight={600} gutterBottom>
              {product.productTitle}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Rs {product.price}
            </Typography>

            {/* Quantity selection */}
            <Grid container alignItems="center" pt={15}>
              <Grid item>
                <Typography variant="subtitle1">Quantity:</Typography>
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <Select
                    value={quantity}
                    onChange={handleQuantityChange}
                    size="small"
                    sx={{ width: "100px", ml: 1 }}
                  >
                    {[1, 2, 3, 4, 5].map((quantity) => (
                      <MenuItem key={quantity} value={quantity}>
                        {quantity}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Add to cart button */}
            <Grid container my={5} display="flex" alignItems="center">
              <Grid item sm={10} md={10}>
                <AddToCartBtn
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  setTotalCost={setTotalCost}
                  item={product}
                  isFullWidth={true}
                />
              </Grid>

              {/* Whishlist button */}
              <Grid item sm={2} md={2}>
                <WishlistBtn
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                  item={product}
                />
              </Grid>
            </Grid>

            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleExpand("panel1")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Description</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">{product.description}</Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleExpand("panel2")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  Reviews ({singleProduct.reviews?.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {singleProduct?.reviews?.map((review) => (
                  <Box key={review.id} py={1}>
                    <Grid container>
                      <Grid item>
                        <Avatar />
                      </Grid>
                      <Grid item ml={1}>
                        <Stack sx={{ lineHeight: "1" }}>
                          <Typography variant="subtitle1" color="text.disable">
                            Name
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            sx={{ lineHeight: "0.3" }}
                          >
                            email@gmail.com
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>

                    <Typography variant="body1" py={1}>
                      {review.title}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      lineHeight={1}
                      pb={1}
                    >
                      {review.body}
                    </Typography>
                    <Divider />
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>

            <Grid item xs={6} display="flex" py={2} alignItems="center">
              <Typography variant="subtitle1" gutterBottom>
                Share:
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                fontSize="small"
                pl={1}
                color="text.secondary"
              >
                <Tooltip title="Copy Link">
                  <ShareIcon fontSize="small" onClick={handleCopyLink} />
                </Tooltip>
                {/* <WhatsAppIcon />
                <FacebookIcon />
                <PinterestIcon />
                <InstagramIcon /> */}
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
