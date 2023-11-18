import BeenhereIcon from "@mui/icons-material/Beenhere";
import {Box, Typography} from "@mui/material";
import {toast} from "react-toastify";

const SuccessNotification = (pushToastList, notificationType, t, status) => {
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
                        <BeenhereIcon color="success" sx={{mr: 1.6}}/>
                        <Box sx={{display: "flex", flexDirection: "column"}}>
                            <Typography color="success.main" variant="button">
                                {t("notifications.success")} ({t("notifications.code")}:{" "}
                                {status})
                            </Typography>
                            <Typography variant="caption">
                                {t("notifications.success_static_text")}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </>
        ),
        {
            containerId: 'validation',
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true,
            closeOnClick: false,
            draggable: true,
        }
    );
    pushToastList(notificationType, toastId);
};

export default SuccessNotification;