import {Fade, Stack} from "@mui/material";
import React from "react";

export const CenterLayout: React.FC<React.PropsWithChildren<{
    spacing?: string | number,
    sx?: any
}>> = (props) => {
    return (
        <Fade in={true}>
            <Stack
                alignItems="center"
                justifyContent="center"
                spacing={props?.spacing}
                sx={{flex: 1, py: 3, ...props?.sx}}
            >
                {props.children}
            </Stack>
        </Fade>
    );
};