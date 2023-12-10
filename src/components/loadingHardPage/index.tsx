import {Backdrop, Box, Stack, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import React from "react";
import {SvgLoading} from "../svgs";

const LoadingImage = styled(Box)({
    "@keyframes load": {
        "0%": {
            // opacity: 0,
            transform: "scale(1)",
        },
        "50%": {
            // opacity: 1,
            transform: "scale(0.5)",
        },
        "100%": {
            // opacity: 0,
            transform: "scale(1)",
        },
    },
    animation: "load 2s infinite",
});

export const LoadingHardPage: React.FC<React.PropsWithChildren<{
    loading: boolean,
    sx?: any,
    icon?: any,
    width?: string | number,
    height?: string | number,
    label?: string
}>> = ({
           children,
           loading,
           sx = {},
           icon = null,
           width = 200,
           height = 200,
           label = ''
       }) => {
    return (
        <>
            <Backdrop
                sx={{bgcolor: "#fff", zIndex: (theme) => theme.zIndex.modal + 1, ...sx}}
                open={loading}
            >
                <Stack alignItems={'center'} spacing={2}>
                    <LoadingImage
                        width={width}
                        height={height}
                    >
                        {icon ? (
                            <Box sx={{color: "primary.main", width: width, height: height}}>
                                {icon}
                            </Box>
                        ) : (
                            <SvgLoading width={width}
                                        height={height}/>
                        )}
                    </LoadingImage>
                    <Typography variant={'body2'} sx={{color: "primary.main"}}>{label}</Typography>
                </Stack>
            </Backdrop>
            {children}
        </>
    );
};