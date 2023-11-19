import DangerousIcon from "@mui/icons-material/Dangerous";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
const ErrorNotification = (pushToastList, notificationType, t, status, message) => {
  const toastId = toast(() => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Box, {
    sx: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      justifyContent: "start"
    }
  }, /*#__PURE__*/React.createElement(Box, {
    sx: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(DangerousIcon, {
    color: "error",
    sx: {
      mr: 1.6
    }
  }), /*#__PURE__*/React.createElement(Box, {
    sx: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    color: "error",
    variant: "button"
  }, t("notifications.error"), " (", t("notifications.code"), ": ", status, ")"), /*#__PURE__*/React.createElement(Typography, {
    variant: "caption"
  }, message || t("notifications.error_static_text")))))), {
    containerId: 'validation',
    autoClose: false,
    closeOnClick: false,
    draggable: false
  });
  pushToastList(notificationType, toastId);
};
export default ErrorNotification;