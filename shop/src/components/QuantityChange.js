// import { OutlinedInput } from "@mui/material";
// import React from "react";

// const QuantityChange = ({
//   item,
//   setProductQuantities,
//   setAvailableStock,
//   productQuantities,
// }) => {
//   const handleQuantityChange = (event) => {
//     let value = parseInt(event.target.value);
//     value = isNaN(value) ? 1 : value; // Set default value to 1 if value is NaN

//     // Adjust the value to be within the valid range
//     value = Math.max(1, Math.min(value, item.stock));

//     // setQuantity(value);
//     setProductQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [item._id]: value,
//     }));

//     setAvailableStock(item.stock - value);
//   };
//   return (
//     <OutlinedInput
//       type="number"
//       value={productQuantities[item._id] !== undefined ? productQuantities[item._id] : 1}
//       onChange={handleQuantityChange}
//       min="1"
//       sx={{
//         width: "70px",
//         height: "25px",
//         fontSize: "14px",
//       }}
//     />
//   );
// };

// export default QuantityChange;
