import {Box, Drawer, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import React from "react";
import {SidebarProps} from "../../../../@types/dashboard";
import SidebarDrawer from "./sidebarDrawer";

const Sidebar: React.FC<SidebarProps> = (props) => {
    const theme = useTheme();
    const isUpSm = useMediaQuery((theme.breakpoints.up('sm')))

    return (
        <Box
            component="nav"
            sx={{width: {md: props.drawerWidth}, flexShrink: {sm: 0}}}
            aria-label="mailbox folders"
        >
            {isUpSm ? (
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: "none", md: "block"},
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: props.drawerWidth,
                            overflow: "hidden",
                        },
                    }}
                    open
                >
                    <SidebarDrawer {...props}/>
                </Drawer>
            ) : (
                <Drawer
                    data-testid="mobile-drawer"
                    container={props.container}
                    variant="temporary"
                    open={props.mobileOpen}
                    onClose={props.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: {xs: "block", md: "none"},
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: props.drawerWidth,
                            overflow: "hidden",
                        },
                    }}
                >
                    <SidebarDrawer {...props}/>
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;
