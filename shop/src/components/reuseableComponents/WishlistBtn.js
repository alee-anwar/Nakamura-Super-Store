import React from 'react'
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { Box, Checkbox } from '@mui/material';

const WishlistBtn = ({wishlist, setWishlist, item}) => {
    const isItemInWishlist = wishlist.some(
        (wishlistItem) => wishlistItem._id === item._id
      );

      const label = { inputProps: { "aria-label": "Checkbox demo" } };

      const handleToggleWishlist = () => {
        const isInWishlist = wishlist.some(
          (wishlistItem) => wishlistItem._id === item._id
        );
        if (isInWishlist) {
          setWishlist((prevWishlist) =>
            prevWishlist.filter((wishlistItem) => wishlistItem._id !== item._id)
          );
        } else {
          setWishlist((prevWishlist) => [...prevWishlist, item]);
        }
      };
  return (
    <Box display="flex" justifyContent="flex-end">
    <Checkbox
      className="wishlist--icon"
      icon={<FavoriteBorderRoundedIcon color="primary" />}
      checkedIcon={<FavoriteRoundedIcon color="primary" />}
      checked={isItemInWishlist}
      onChange={handleToggleWishlist}
    />
  </Box>
  )
}

export default WishlistBtn