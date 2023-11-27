import {Toolbar} from "@mui/material";
import React, {useState} from "react";
import {FullPageLayout} from "../../../layouts";
import Content from "./content";
import Header from "./header";
import {IDashboardProps} from "../../../@types/dashboard";
import Sidebar from "./sidebar";

const drawerWidth = 240;

export const Dashboard: React.FC<React.PropsWithChildren<IDashboardProps>> = (props) => {
    const {window} = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const container =
        window !== undefined ? () => window().document.body : undefined;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    return (
        <FullPageLayout direction="row">
            <Header
                handleDrawerToggle={handleDrawerToggle}
                drawerWidth={drawerWidth}
                {...props}
            />
            <Sidebar
                container={container}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                drawerWidth={drawerWidth}
                {...props}
            />
            <FullPageLayout
                component="main"
                sx={{flexGrow: 1, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
            >
                <Toolbar/>
                <Content {...props}/>
            </FullPageLayout>
        </FullPageLayout>
    )
}