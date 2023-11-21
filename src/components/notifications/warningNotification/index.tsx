import ReportIcon from "@mui/icons-material/Report";
import {Box, Typography} from "@mui/material";
import {toast} from "react-toastify";
import {IPushToastList} from "../../../@types/toast";
import React from "react";

const WarningNotification = (pushToastList: IPushToastList, notificationType: string, t: any, status: any) => {
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
                        <ReportIcon color="warning" sx={{mr: 1.6}}/>
                        <Box sx={{display: "flex", flexDirection: "column"}}>
                            <Typography color="warning.main" variant="button">
                                {t("notifications.warning")} ({t("notifications.code")}:{" "}
                                {status})
                            </Typography>
                            <Typography variant="caption">
                                {t("notifications.warning_static_text")}
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

export default WarningNotification;