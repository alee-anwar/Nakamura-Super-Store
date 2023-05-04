import React from "react";
import {
  Box,
  Grid,
  IconButton,
  OutlinedInput,
  Skeleton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function CartItem({ item, handleRemoveItem, handleUpdateQuantity }) {
  const { image, productTitle, quantity, size, price } = item;
  return (
    <>
      <Grid container>
        <Grid item xs={4} sm={3} md={3} lg={2} p={1}>
          <img src={image} width={100} height={100} alt={productTitle} />
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          {/* <Typography variant="subtitle1" fontWeight="bold" pt={1}>
            {productTitle}
          </Typography> */}
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
          <Box pt={3}>
            <Typography variant="subtitle2">Quantity:</Typography>
            <OutlinedInput
              type="number"
              value={quantity}
              onChange={(e) =>
                handleUpdateQuantity(item._id, Number(e.target.value))
              }
              min="1"
              sx={{
                width: "70px",
                height: "25px",
                fontSize: "14px",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={2} sm={3} md={4} lg={4}>
          <Typography variant="subtitle1" fontWeight={500} pt={1}>
            {typeof price === "number" ? (
              `Rs ${price?.toFixed(2)}`
            ) : (
              <Skeleton />
            )}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={1} lg={2}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={() => handleRemoveItem(item._id)}>
              <DeleteIcon color="error.main" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default CartItem;
