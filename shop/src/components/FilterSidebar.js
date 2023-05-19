// import React, { useState } from "react";
// import {
//   Paper,
//   FormControl,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   Button,
//   Typography,
//   Box,
// } from "@mui/material";
// import axios from "axios";
// import { categories } from "./reuseableComponents/allCategories";

// const FilterSidebar = ({ setFilteredProducts }) => {
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedPrice, setSelectedPrice] = useState("");

//   const handleCategoryChange = (event) => {
//     const { name } = event.target;
//     setSelectedCategories((prevSelectedCategories) => {
//       if (prevSelectedCategories.includes(name)) {
//         return prevSelectedCategories.filter((category) => category !== name);
//       } else {
//         return [...prevSelectedCategories, name];
//       }
//     });
//   };

//   const handlePriceChange = (event) => {
//     setSelectedPrice(event.target.value);
//   };

//   const handleFilter = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3000/productList/filterProducts/${selectedPrice}`
//       );
//       console.log("response of filter is",response.data.data.sortingPrice);
//       setFilteredProducts(response.data.data.sortingPrice
//         );
//     } catch (error) {
//       console.error("Error filtering products:", error);
//     }
//   };
  

//   return (
//     <Paper
//       elevation={2}
//       style={{ padding: "16px", width: "auto", height: "auto" }}
//     >
//       <FormControl component="fieldset" p={2}>
//         <Typography variant="h6">Price</Typography>
//         <FormGroup>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={selectedPrice === "highToLow"}
//                 onChange={handlePriceChange}
//                 value="highToLow"
//               />
//             }
//             label="High to Low"
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={selectedPrice === "lowToHigh"}
//                 onChange={handlePriceChange}
//                 value="lowToHigh"
//               />
//             }
//             label="Low to High"
//           />
//         </FormGroup>
//         {/* <Typography variant="h6">Categories</Typography> */}
//         {/* <FormGroup>
         
//           {categories.map((category) => (
//             <FormControlLabel
//               key={category.id}
//               control={
//                 <Checkbox
//                   checked={selectedCategories.includes(category.value)}
//                   onChange={handleCategoryChange}
//                   name={category.value}
//                 />
//               }
//               label={category.label}
//             />
//           ))}
//         </FormGroup> */}
//         <Box>
//         <Button variant="contained"  onClick={handleFilter}>
//           Filter
//         </Button>
//         </Box>
        
//       </FormControl>
//     </Paper>
//   );
// };

// export default FilterSidebar;
