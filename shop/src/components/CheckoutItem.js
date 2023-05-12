import React from "react";
import {
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";

function CheckoutItem({ item }) {
  const { image, productTitle, quantity, size, price } = item;
  return (
    <>
      <Grid container>
        <Grid item md={3}>
          <img src={image} width={65} height='auto' alt={productTitle} />
        </Grid>
        <Grid item  md={7}>
          <Typography
            lineHeight={1.1}
            noWrap={false}
            variant="body"
            sx={{
              // overflowWrap: "break-word",
              maxHeight: 32,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              pb: 0.6,
              fontWeight: "500",
              pt: 1,
            }}
          >
            {typeof item.productTitle === "string" ? (
              item.productTitle
            ) : (
              <Skeleton width={{ md: "200px", xs: "50px" }} />
            )}
          </Typography>
        </Grid>
        <Grid item  md={2}>
          <Typography variant="subtitle1" fontWeight={500} pt={1}>
            {typeof price === "number" ? (
              `Rs ${price?.toFixed(2)}`
            ) : (
              <Skeleton />
            )}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default CheckoutItem;
