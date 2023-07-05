import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const ConfirmationDialog = ({ open, onClose, message, orderId }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Message</DialogTitle>
      <DialogContent>
        <Box display='flex'>
          <Typography fontWeight={600} variant="h6">
            Order#
          </Typography>
          <Typography pl={1} color="textSecondary" fontWeight={600} variant="h6">
            {orderId}
          </Typography>
        </Box>

        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Link to="/shop">
          <Button onClick={onClose}>OK</Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
