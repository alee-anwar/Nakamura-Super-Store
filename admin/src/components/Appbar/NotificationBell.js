import React from "react";
import Badge from "@mui/material/Badge";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import NotificationMenu from "./NotificationMenu";

const NotificationBell = ({ iconColor }) => {
  const notifications = [
    {
      id: 0,
      label: "First notifiction",
    },
    {
      id: 1,
      label: "Second notifiction",
    },
  ];
  const newNotification = `You have ${notifications.length} notification`;
  const noNotification = "No new Notification";
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    // setAnchorE1(null);
    setOpen(false);
  };
  return (
    <div>
      <Tooltip title={notifications.length ? newNotification : noNotification}>
        <IconButton
          color={iconColor}
          onClick={notifications.length ? handleOpen : null}
          anchorel={anchorEl}
        >
          <Badge badgeContent={notifications.length} color="primary">
            <NotificationsRoundedIcon color="action" />
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationMenu
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        menuItems={notifications}
      />
    </div>
  );
};

export default NotificationBell;
