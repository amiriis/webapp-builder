import {Avatar, IconButton, Menu, Tooltip} from "@mui/material";
import React, {useState} from "react";
import {useTranslations} from "next-intl";
import {useUser} from "../../../../../hooks";
import ProfileOptions from "../profileOptions";

function ProfileMenu() {
    const t = useTranslations();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const {user} = useUser();

    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Tooltip title={t("header.open_profile")} arrow>
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar
                        sx={{
                            width: 24,
                            height: 24,
                            backgroundColor: "#fff",
                            color: "primary.main",
                        }}
                        alt="User Image"
                        src={user.avatar || ''}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                MenuListProps={{sx: {py: 0}}}
                sx={{
                    mt: 6,
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <ProfileData/>
                <ProfileOptions handleCloseUserMenu={handleCloseUserMenu}/>
            </Menu>
        </>
    );
}

export default ProfileMenu;