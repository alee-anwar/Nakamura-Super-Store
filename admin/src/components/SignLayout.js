import React from "react";
import { Box, Typography } from "@mui/material";

function SignLayout(props) {
  return (
    <Box>
      <Box>
        <Typography>Appbar</Typography>
      </Box>
      <Box>{props.children}</Box>
    </Box>
  );
}

export default SignLayout;
