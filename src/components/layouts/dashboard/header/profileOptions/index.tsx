import {Box, MenuItem, Typography} from "@mui/material";
import {useTranslations} from "next-intl";
import React from "react";
import {NextLinkComposed} from "../../../../../utils";
import ProfileOptionLogout from "./profileOptionLogout";

const ProfileOptions: React.FC<{
    headerProfileItems: { key: number | string, name: string, route: string, icon: any }[],
    handleCloseUserMenu: any
}> = ({
          headerProfileItems,
          handleCloseUserMenu
      }) => {
    const t = useTranslations();

    return (
        <>
            {headerProfileItems.map((profile_item) => (
                <MenuItem
                    component={NextLinkComposed}
                    to={{
                        pathname: profile_item.route,
                    }}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        borderTop: 1,
                        px: 3,
                        py: 1.5,
                        borderColor: "#e1e1e1",
                    }}
                    key={profile_item.key}
                    onClick={handleCloseUserMenu}
                >
                    <Box sx={{display: "flex", alignItems: "center", flex: 1}}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                color: "primary.main",
                                pr: 2,
                            }}
                            {profile_item.icon}
                        >
                        </Box>
                        <Typography sx={{flex: 1}} textAlign="start">
                            {t(profile_item.name)}
                        </Typography>
                    </Box>
                </MenuItem>
            ))}
            <ProfileOptionLogout handleCloseUserMenu={handleCloseUserMenu}/>
        </>
    );
}

export default ProfileOptions