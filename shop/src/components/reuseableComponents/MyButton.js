import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import MuiButton from "@mui/material/Button";

const StyledButton = styled(MuiButton)`
  && {
    background-color: "primary";
    color: #000;
  }
  @media screen and (max-width: 600px) {
    font-size: 4px;
  }
`;

function MyButton(props) {
  return (
    <StyledButton
      variant="contained"
      component={motion.button}
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.4, duration: 1.5, type: "spring", bounce: 0.6 }}
      {...props}
    >
      {props.children}
    </StyledButton>
  );
}

export default MyButton;
