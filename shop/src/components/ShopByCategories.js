import {
  Avatar,
  Box,
  Button,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Carousel from "react-multi-carousel";
import PropTypes from "prop-types";

const CategoryData = [
  {
    name: "New Arrivals",
    id: "01",
    url: "https://envato-shoebox-0.imgix.net/9d85/e546-12a2-43c6-8652-650d82e986db/2020_002_1448___2020-01-05+10.21.35.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=700&s=3965ec6a55eb850f590eac87e84a8d5e",
    alt: "Top view on a assortment of loose eggs on a market, short circui",
  },
  {
    name: "Fruits",
    id: "02",
    url: "https://envato-shoebox-0.imgix.net/3a89/b96c-beb4-46d0-bd27-029de060faf2/Mixed+fruits8E.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=700&s=6786f506108bee3f7a6161f72667bf03",
    alt: "Assortment of healthy raw fruits. Mixed fruits.",
  },
  {
    name: "Vegetables",
    id: "03",
    url: "https://envato-shoebox-0.imgix.net/4610/58d3-645e-4033-ba3f-e26b964bf07d/FM8_2374_sq.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=1400&s=7699bbde755426700341f2400ed18129",
    alt: "Female farmer holding basket with fresh vegetables, square crop",
  },
  {
    name: "Meat",
    id: "04",
    url: "https://envato-shoebox-0.imgix.net/261a/1a57-852b-4f40-86d2-c2d1fc5c4f17/4V4A5614+copy.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=700&s=aa3c932b815cc0895c0570498b4b13ed",
    alt: "Raw Fresh Marbled Meat Beef Steak",
  },
  {
    name: "Fish",
    id: "05",
    url: "https://envato-shoebox-0.imgix.net/c0eb/986a-e5e3-46a9-a093-c676bae55ea6/20111119_0022.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=700&s=b58a7ae8ec3acec5e382df419d78454f",
    alt: "Fresh fish (Mullus barbatus ponticus)",
  },
  {
    name: "Dairy & Milk",
    id: "06",
    url: "https://envato-shoebox-0.imgix.net/23ce/9483-c3da-42cd-990a-946f0c6b9aaf/sq_milk+pouring+into+glass+and+bowl+with+cornflakes+on+the+table.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=700&s=0c7de67778adc150d7ef8cbf49ee075f",
    alt: "Milk Pouring Into Glass And Bowl With Cornflakes",
  },
  {
    name: "Wheat",
    id: "07",
    url: "https://envato-shoebox-0.imgix.net/e3ac/7aa1-7d29-4e52-84f1-3bc4d6b36706/Canon_250321_1131.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=700&s=0abdb0bdfa85601eb04f8a19590250db",
    alt: "freekeh wheat grains close up",
  },
  {
    name: "Others",
    id: "08",
    url: "https://elements-twenty20-photos-0.imgix.net/production/uploads/items/102e0656-5e6c-47b1-abee-ba7ef61e3a25/source?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=700&s=cc77362e2660cdb4eb0f4e054f177441",
    alt: "groceries",
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 1536, min: 1200 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 1200, min: 900 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 900, min: 600 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

const ShopByCategories = () => {
  return (
    <Box mt={2}>
      <Box display="flex">
        <Typography variant="h1" my={3} flexGrow={1}>
          Shop By Categories
        </Typography>
        <Button
          sx={{
            fontWeight: "500",
            color: "#262626",
            "&:hover": {
              color: "#ffe033",
            },
          }}
          endIcon={<ChevronRightRoundedIcon />}
          disableRipple
        >
          View All
        </Button>
      </Box>
      <Carousel responsive={responsive} showArrows={false}>
        {CategoryData.map((category) => (
          <Box key={category.id}>
            <Box display="flex" alignItems="center" justifyContent="center">
              {category.url ? (
                <Avatar
                  alt={category.alt}
                  src={category.url}
                  sx={{
                    border: "1px solid grey",
                    width: 150,
                    height: 150,
                    transition: "transform 0.5s ease",
                    "&:active": {
                      transform: "scale(0.9)",
                    },
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "5px 5px 10px 1px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                />
              ) : (
                <Skeleton
                  sx={{ bgcolor: "grey.900" }}
                  variant="rectangular"
                  width={410}
                  height={400}
                />
              )}
            </Box>
            <Typography textAlign="center">{category.name}</Typography>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

// const ShopByCategories = () => {
//   const renderAvatar = (category) => {
//     const url = category?.url || "";
//     return (
//       <Avatar
//         alt={category.alt}
//         src={url}
//         sx={{
//           width: 150,
//           height: 150,
//           transition: "transform 0.5s ease",
//           "&:active": {
//             transform: "scale(0.9)",
//           },
//           "&:hover": {
//             transform: "scale(1.02)",
//             boxShadow: "5px 5px 10px 1px rgba(0, 0, 0, 0.1)",
//           },
//         }}
//       />
//     );
//   };

//   return (
//     <Box mt={2}>
//       <Box display="flex">
//         <Typography variant="h1" my={3} flexGrow={1}>
//           Shop By Categories
//         </Typography>
//         <Button
//           sx={{
//             fontWeight: "500",
//             color: "#262626",
//             "&:hover": {
//               color: "#ffe033",
//             },
//           }}
//           endIcon={<ChevronRightRoundedIcon />}
//           disableRipple
//         >
//           View All
//         </Button>
//       </Box>

//       <Carousel responsive={responsive} showArrows={false}>
//         <List sx={{ display: 'flex', flexDirection: 'row' }}>
//           {CategoryData.map((category) => (
//             <ListItem key={category.id}>
//               <Box>
//                 {category.url ? (
//                   renderAvatar(category)
//                 ) : (
//                   <Skeleton
//                     sx={{ bgcolor: "grey.900" }}
//                     variant="rectangular"
//                     width={410}
//                     height={400}
//                   />
//                 )}
//                 <ListItemText
//                   primary={category.name}
//                   sx={{
//                     textAlign: "center",
//                     "&:hover": {
//                       color: "#ffe033",
//                     },
//                   }}
//                 />
//               </Box>
//             </ListItem>
//           ))}
//         </List>
//       </Carousel>
//     </Box>
//   );
// };

export default ShopByCategories;
