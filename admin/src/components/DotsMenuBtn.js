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
  // const [data, setData] = React.useState();

  // const setData = (data) => {
  //   // let { title, id, description, category, price, status, date, subcategory, color, tag, image, quantity } = data;
  //   Object.entries(data).forEach(([key, value]) => {
  //     console.log(`"key" ${key} value: ${value}`);
  //     localStorage.setItem(key, value);
  //   });
  // };

  // const handleEditClick = (id) => {
  //   // find the product with matching id from the setData state
  //   const product = setData.find((p) => p.id === id);
  //   // store the product data in local storage
  //   localStorage.setItem('editProduct', JSON.stringify(product));
  //   // navigate to the edit page
  //   navigate('/editproduct');
  // }

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
            // handleEditClick(props.product.id)
            // console.log(props.product)
            navigate("/editproduct");
          }}
        >
          View
        </MenuItem>
        <MenuItem
          sx={{ py: 0.2 }}
          onClick={() => {
            // console.log(props.product.id);
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
