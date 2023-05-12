import { Box, Typography } from "@mui/material";
import Logo from "../assets/empty.png";
import { Link } from "react-router-dom";

const ErrorMessage = ({ errorMessage, path, linkMsg }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        pb: 20,
      }}
    >
      <Box component="img" src={Logo} sx={{ height: "20vh", width: "auto" }} />
      <Typography variant="h6" color="textSecondary">
        {errorMessage}
      </Typography>

      <Typography variant="body2" color="textSecondary">
        <Link to={path} style={{ color: "#ffb800" }}>
          {linkMsg}
        </Link>
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
