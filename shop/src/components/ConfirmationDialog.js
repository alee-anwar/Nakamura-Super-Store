import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ConfirmationDialog = ({ open, onClose, message }) => {
    return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Message</DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions>
        <Link to='/shop'>
        <Button onClick={onClose}>OK</Button>

        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
