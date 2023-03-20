import { Container, Typography } from "@mui/material";
import React from "react";
import { AppbarSpace } from "./AppbarSpace";
const Header = ({ title }) => {
  return (
    <Container>
      <AppbarSpace />
      <Typography variant="h1">{title}</Typography>
      {/* <LiveSearch/> */}
    </Container>
  );
};

export default Header;
