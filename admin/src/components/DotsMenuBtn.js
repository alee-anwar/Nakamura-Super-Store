import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useNavigate } from "react-router-dom";

export default function DotsMenuBtn(props) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disableRipple
        sx={{ p: 0 }}
      >
        <MoreHorizRoundedIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          sx={{ py: 0.2 }}
          onClick={() => {
            navigate(`/editproduct/${props.product.id}`);
          }}
        >
          View
        </MenuItem>
        <MenuItem
          sx={{ py: 0.2 }}
          onClick={() => {
            props.handleDelete(props.product.id);
            console.log(props.product.id)
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
