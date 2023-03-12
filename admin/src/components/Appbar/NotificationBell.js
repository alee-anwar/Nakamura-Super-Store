import React from "react";
import Badge from "@mui/material/Badge";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { IconButton } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';

const NotificationBell = ({ iconColor, badgeContent }) => {
    const newNotification = `You have ${badgeContent} notification`;
    const noNotification = 'No new Notification'
  return (
    <Tooltip title={badgeContent? newNotification : noNotification}>
    <IconButton color="iconColor">
      <Badge badgeContent={badgeContent} color="primary">
        <NotificationsRoundedIcon color="action" />
      </Badge>
    </IconButton>
    </Tooltip>
  );
};

export default NotificationBell;
