import DangerousIcon from "@mui/icons-material/Dangerous";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
const UploadFileNotification = t => {
  toast(({
    closeToast
  }) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Box, {
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
  }, t("UploadSystem.uploadfile_error")))))), {
    containerId: 'validation',
    toastId: 'upload',
    autoClose: 3000,
    hideProgressBar: true,
    pauseOnHover: true,
    closeOnClick: false,
    draggable: true
  });
};
export default UploadFileNotification;