import {Box, Button, MenuItem, Typography} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import {useTranslations} from "next-intl";
import React from "react";
import {useUser} from "../../../../../../hooks";
import {HeaderProfileProps} from "../../../../../../@types/dashboard";

const ProfileOptionLogout: React.FC<HeaderProfileProps> = (props) => {
    const t = useTranslations();
    const {clearToken} = useUser();
    const handleClickLogout = () => {
        props.handleCloseUserMenu();
        clearToken();
    };

    return (
        <>
            <MenuItem
                component={Button}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    borderTop: 1,
                    px: 3,
                    py: 1.5,
                    borderColor: "#e1e1e1",
                    textTransform: "unset",
                }}
                onClick={handleClickLogout}
            >
                <Box sx={{display: "flex", alignItems: "center", flex: 1}}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "primary.main",
                            pr: 2,
                        }}
                    >
                        <MeetingRoomIcon/>
                    </Box>
                    <Typography sx={{flex: 1}} textAlign="start">
                        {t("header.logout")}
                    </Typography>
                </Box>
            </MenuItem>
        </>
    );
}

export default ProfileOptionLogout