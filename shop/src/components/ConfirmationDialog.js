import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ConfirmationDialog = ({ open, onClose, message }) => {
    return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions>
        <Link to='/home'>
        <Button onClick={onClose}>OK</Button>

        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
