import DangerousIcon from "@mui/icons-material/Dangerous";
import {Box, Typography} from "@mui/material";
import {toast} from "react-toastify";

const UploadFileNotification = (t) => {
    toast(
        ({closeToast}) => (
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
                                {t("UploadSystem.uploadfile_error")}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </>
        ),
        {
            containerId: 'validation',
            toastId: 'upload',
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true,
            closeOnClick: false,
            draggable: true,
        }
    );
};

export default UploadFileNotification;