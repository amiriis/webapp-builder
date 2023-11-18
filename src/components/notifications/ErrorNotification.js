import DangerousIcon from "@mui/icons-material/Dangerous";
import {Box, Typography} from "@mui/material";
import {toast} from "react-toastify";

const ErrorNotification = (pushToastList, notificationType, t, status, message) => {
    const toastId = toast(
        () => (
            <>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "start",
                    }}
                >
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <DangerousIcon color="error" sx={{mr: 1.6}}/>
                        <Box sx={{display: "flex", flexDirection: "column"}}>
                            <Typography color="error" variant="button">
                                {t("notifications.error")} ({t("notifications.code")}: {status})
                            </Typography>
                            <Typography variant="caption">
                                {message || t("notifications.error_static_text")}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </>
        ),
        {
            containerId: 'validation',
            autoClose: false,
            closeOnClick: false,
            draggable: false,
        }
    );
    pushToastList(notificationType, toastId);
};

export default ErrorNotification;