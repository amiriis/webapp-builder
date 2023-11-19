import BeenhereIcon from "@mui/icons-material/Beenhere";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
const SuccessNotification = (pushToastList, notificationType, t, status) => {
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
  }, /*#__PURE__*/React.createElement(BeenhereIcon, {
    color: "success",
    sx: {
      mr: 1.6
    }
  }), /*#__PURE__*/React.createElement(Box, {
    sx: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    color: "success.main",
    variant: "button"
  }, t("notifications.success"), " (", t("notifications.code"), ":", " ", status, ")"), /*#__PURE__*/React.createElement(Typography, {
    variant: "caption"
  }, t("notifications.success_static_text")))))), {
    containerId: 'validation',
    autoClose: 3000,
    hideProgressBar: true,
    pauseOnHover: true,
    closeOnClick: false,
    draggable: true
  });
  pushToastList(notificationType, toastId);
};
export default SuccessNotification;