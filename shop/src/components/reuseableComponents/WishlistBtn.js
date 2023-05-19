import React from "react";
import { Box, Checkbox } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

const WishlistBtn = ({ wishlist, setWishlist, item }) => {
  const isItemInWishlist =
  Array.isArray(wishlist) && wishlist.some((wishlistItem) => wishlistItem._id === item._id);

  // const handleToggleWishlist = () => {
  //   // Add or remove item from the wishlist based on its current presence
  //   if (isItemInWishlist) {
  //     setWishlist((prevWishlist) =>
  //       prevWishlist.filter((wishlistItem) => wishlistItem._id !== item._id)
  //     );
  //   } else {
  //     setWishlist((prevWishlist) => [...prevWishlist, item]);
  //   }
  // };
  // console.log("WishlistBtn Clicked");

  const handleToggleWishlist = () => {
    // Add or remove item from the wishlist based on its current presence
    if (isItemInWishlist) {
      const updatedWishlist = wishlist.filter((wishlistItem) => wishlistItem._id !== item._id);
      setWishlist(updatedWishlist);
    } else {
      const updatedWishlist = [...wishlist, item];
      setWishlist(updatedWishlist);
    }
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <Checkbox
        className="wishlist-icon"
        icon={<FavoriteBorderRoundedIcon color="primary" />}
        checkedIcon={<FavoriteRoundedIcon color="primary" />}
        checked={isItemInWishlist}
        onChange={handleToggleWishlist}
      />
    </Box>
  );
};

export default WishlistBtn;