import {Stack} from "@mui/material";
import React from "react";

export const FullPageLayout: React.FC<React.PropsWithChildren<{
    spacing?: string | number,
    direction?: any,
    component?: any,
    sx?: any
}>> = (props) => {
    return (
        <Stack
            spacing={props?.spacing}
            direction={props?.direction}
            component={props?.component}
            sx={{
                width: "100%",
                height: "100%",
                overflowY: "scroll",
                overflowX: "scroll",
                ...props?.sx,
            }}
        >
            {props.children}
        </Stack>
    );
};
