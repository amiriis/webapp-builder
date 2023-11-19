import ReportIcon from "@mui/icons-material/Report";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
const WarningNotification = (pushToastList, notificationType, t, status) => {
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
  }, /*#__PURE__*/React.createElement(ReportIcon, {
    color: "warning",
    sx: {
      mr: 1.6
    }
  }), /*#__PURE__*/React.createElement(Box, {
    sx: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    color: "warning.main",
    variant: "button"
  }, t("notifications.warning"), " (", t("notifications.code"), ":", " ", status, ")"), /*#__PURE__*/React.createElement(Typography, {
    variant: "caption"
  }, t("notifications.warning_static_text")))))), {
    containerId: 'validation',
    autoClose: false,
    closeOnClick: false,
    draggable: false
  });
  pushToastList(notificationType, toastId);
};
export default WarningNotification;