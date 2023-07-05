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

  const handleViewClick = () => {
    if (props.viewType === "product") {
      navigate(`/editproduct/${props.product.id}`);
    } else if (props.viewType === "order") {
      navigate(`/viewOrder/${props.product.id}`);
    }
    handleClose();
  };

  const handleDeleteClick = () => {
    console.log(props.product.id);
    props.handleDelete(props.product.id);
    handleClose();
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
        <MenuItem sx={{ py: 0.2 }} onClick={handleViewClick}>
          {(() => {
            switch (props.viewType) {
              case "product":
                return "Edit";
              case "order":
                return "View";
              default:
                return "";
            }
          })()}
        </MenuItem>

        <MenuItem sx={{ py: 0.2 }} onClick={handleDeleteClick}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
