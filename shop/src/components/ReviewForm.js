import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Rating,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Divider,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

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
      customerName: "Noman",
      phoneNumber: "0305******",
      review:
        "This is a great product. I would definitely recommend it to others.",
      rating: 1,
    },
    {
      id: 2,
      customerName: "Emal",
      phoneNumber: "0305******",
      review:
        "The product was not as advertised. It was much smaller than I expected.",
      rating: 3.5,
    },
    {
      id: 3,
      customerName: "Najam",
      phoneNumber: "0305******",
      review:
        "This is a good value for the price. I am very happy with my purchase.",
      rating: 2,
    },
  ],
};

const ReviewForm = ({ productId, description, productTitle }) => {
  const [expanded, setExpanded] = useState(false);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [showRatingAlert, setShowRatingAlert] = useState(false);
  const [updateReviews, setUpdateReviews] = useState(false)

  //   const handleExpand = (panel) => (newExpanded) => {
  //     setExpanded(newExpanded ? panel : false);
  //   };

  const handleExpand = (panel) => (newExpanded) => {
    setExpanded((prevExpanded) =>
      prevExpanded === panel && newExpanded ? false : panel
    );
  };

  useEffect(() => {
    // Fetch reviews from the API based on the productId
    axios
      .get(`http://localhost:3000/reviewList/searchReview/${productTitle}`)
      .then((response) => {
        setReviews(response.data.data.searchedReview);
        setTotalReviews(response.data.results);
        console.log("reviews", reviews);
        console.log("results", response.data.results);
        console.log("data", response.data.data.searchedReview);
        console.log("status", response.data.status);
        setUpdateReviews(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [updateReviews]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (rating === 0) {
      setShowRatingAlert(true);
      return;
    }

    // Reset the rating alert
    setShowRatingAlert(false);
    // Create an object with the form data
    const formData = {
      productId: productId,
      productTitle: productTitle,
      rating: rating,
      name: name,
      phoneNumber: phoneNumber,
      reviewText: reviewText,
    };

    // Make an API call to submit the review
    axios
      .post("http://localhost:3000/reviewList/postReview", formData)
      .then((response) => {
        // Handle the response from the server
        console.log(response.data); // You can customize this part based on your server response
        console.log(formData);
        // Reset the form fields
        setUpdateReviews(true);
        setRating(0);
        setName("");
        setPhoneNumber("");
        setReviewText("");
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any errors that occurred during the API call
      });
  };

  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleExpand("panel1")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">{description}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleExpand("panel2")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">Reviews ({totalReviews})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {reviews.map((review) => (
            <Box py={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar>
                  {review.customerName
                    ? review.customerName.charAt(0).toUpperCase()
                    : ""}
                </Avatar>

                <Typography variant="subtitle1" color="text.disable">
                  {review.customerName}
                </Typography>
              </Stack>
              <Rating
                name="read-only"
                value={review.rating}
                readOnly
                sx={{ py: 1 }}
                precision={0.5}
              />

              <Typography
                variant="subtitle2"
                color="text.secondary"
                lineHeight={1}
                pb={1}
              >
                {review.reviewMessage}
              </Typography>
              <Divider />
            </Box>
          ))}

          {/* Review form */}
          <Box py={2}>
            <Typography
              variant="subtitle1"
              gutterBottom
              align="center"
              fontWeight={600}
            >
              Submit a Review
            </Typography>
            <Stack spacing={1}>
              <Box display="flex" alignItems="center">
                <Typography color="textSecondary">Rating:</Typography>
                <Rating
                  name="simple-controlled"
                  precision={0.5}
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                    // console.log(rating);
                  }}
                />
              </Box>

              <TextField
                id="customer-name"
                label="Name"
                variant="outlined"
                fullWidth
                size="small"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <TextField
                id="phone-number"
                label="Phone Number"
                variant="outlined"
                fullWidth
                size="small"
                value={phoneNumber}
                onChange={(event) => {
                  setPhoneNumber(event.target.value);
                }}
              />
              <TextField
                id="review-text"
                label="Comment"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                size="small"
                value={reviewText}
                onChange={(event) => {
                  setReviewText(event.target.value);
                }}
              />
              {/* <TextField type="hidden" name="productId" value={productId} /> */}
              <input type="hidden" name="productId" value={productId} />
              <Button
                variant="contained"
                color="primary"
                onClick={handleFormSubmit}
              >
                Submit
              </Button>
            </Stack>
            {/* Rating alert */}
            {showRatingAlert && (
              <Alert sx={{mt: 1}} severity="error">Please enter a review rating.</Alert>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ReviewForm;
