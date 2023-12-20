import MenuIcon from "@mui/icons-material/Menu";
import {useTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {AppBar, Box, Container, IconButton, Stack, Toolbar} from "@mui/material";
import React from "react";
import ProfileMenu from "./profileMenu";
import {HeaderProps} from "../../../../@types/dashboard";

const Header: React.FC<HeaderProps> = (props) => {
    const theme = useTheme();

    return (
        <>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{
                    width: {md: `calc(100% - ${props.drawerWidth}px)`},
                    ml: {md: `${props.drawerWidth}px`},
                }}
            >
                <Container maxWidth={false}>
                    <Toolbar
                        disableGutters
                        sx={{
                            display: "flex",
                        }}
                    >
                        <Stack direction="row" justifyContent="flex-start" sx={{flex: 1}}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={props.handleDrawerToggle}
                                edge="start"
                                sx={{display: {md: "none"}, m: 0}}
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            sx={{
                                flex: 1,
                                position: "relative",
                                ...theme.mixins.toolbar,
                            }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    my: 1,
                                    width: 56,
                                    height: 56,
                                    "@media (min-width:600px)": {maxWidth: 64, maxHeight: 64},
                                    "@media (min-width:0px)": {
                                        "@media (orientation: landscape)": {
                                            width: 48,
                                            height: 48,
                                        },
                                    },
                                }}
                            >
                            </Box>
                        </Stack>
                        <Stack direction="row" justifyContent="flex-end" sx={{flex: 1}}>
                            {props.HeaderItem.map(item => (
                                <>
                                    {item}
                                </>
                            ))}
                            <ProfileMenu {...props}/>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default Header;
