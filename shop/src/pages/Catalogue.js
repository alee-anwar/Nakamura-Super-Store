import React from "react";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import { Box, Container } from "@mui/material";
import FilterSidebar from "../components/FilterSidebar";


const Catalogue = () => {
  return (
    <Box pt={5}>
      <Container maxWidth="lg">
        <BreadcrumbsComponent name={"Catalogue"} path={"/catalogue"} />
        <Box sx={{display: 'flex', mt: 3}}>
          <FilterSidebar />
          <Box m={2}>Catalogue</Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Catalogue;
