import { styled } from "@mui/material/styles";
export const DrawerSpace = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.drawer,
}));

{/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
  <DrawerHeader />
</Box>; */}
