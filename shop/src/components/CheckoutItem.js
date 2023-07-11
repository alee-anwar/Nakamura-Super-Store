import React from "react";
import {
  Box,
  Skeleton,
  Typography,
} from "@mui/material";

function CheckoutItem({ item, productQuantities }) {
  const { _id, image, productTitle, price } = item;
  return (
    <>
      <Box display='flex'>
        <Box>
          <img src={image} width={65} height='auto' alt={productTitle} />
        </Box>
        <Box pl={2} flexGrow={1}>
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
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={500} pt={1}>
            {typeof price === "number" ? (
              `AFN ${price?.toFixed(2)}`
            ) : (
              <Skeleton />
            )}
          </Typography>
          <Typography>
            x {productQuantities[_id] || 1}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default CheckoutItem;
