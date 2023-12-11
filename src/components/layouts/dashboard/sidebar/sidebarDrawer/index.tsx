import {Divider, Stack, Toolbar, Typography} from "@mui/material";
import {useTranslations} from "next-intl";
import React from "react";
import {useUser} from "../../../../../hooks";
import SidebarList from "./sidebarList";
import {SidebarDrawerAndListProps} from "../../../../../@types/dashboard";

const SidebarDrawer: React.FC<SidebarDrawerAndListProps> = (props) => {
    const {user} = useUser();
    const t = useTranslations();
    return (
        <>
            <Toolbar>
                <Stack>
                    <Typography variant="h6" sx={{color: "primary.main"}}>
                        {t("app_short_name")}
                    </Typography>
                    <Typography variant="caption">
                        {props.user_introduction}
                    </Typography>
                </Stack>
            </Toolbar>
            <Divider/>
            <SidebarList {...props}/>
        </>
    );
};

export default SidebarDrawer;