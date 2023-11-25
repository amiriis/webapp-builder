import {CacheProvider} from "@emotion/react";
import {GlobalStyles} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@mui/material/styles";
import Head from "next/head";
import {useDirection} from "../../hooks";
import React from "react";
import {NoSsrHandler} from "../../components";
import {createEmotionCacheLtr, createEmotionCacheRtl} from "../../utils";

const clientSideEmotionCacheRtl = createEmotionCacheRtl();
const clientSideEmotionCacheLtr = createEmotionCacheLtr();
export const MuiLayout: React.FC<React.PropsWithChildren<{
    themes: { rtl?: any, ltr?: any },
    isBot?: boolean
}>> = ({
           children,
           themes,
           isBot = false
       }) => {
    const {directionApp} = useDirection()
    const theme = directionApp === "rtl" ? themes.rtl : themes.ltr
    console.log(theme)

    return (
        <NoSsrHandler isBot={isBot}>
            <CacheProvider value={directionApp === "rtl" ? clientSideEmotionCacheRtl : clientSideEmotionCacheLtr}>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                </Head>
                <ThemeProvider theme={directionApp === "rtl" ? themes.rtl : themes.ltr}>
                    <GlobalStyles
                        styles={{
                            "*::-webkit-scrollbar": {
                                height: "8px",
                            },
                            "*:not(.MuiTableContainer-root)::-webkit-scrollbar": {
                                display: "none",
                            },
                            "*::-webkit-scrollbar-thumb": {
                                background: `${theme.palette.primary.light}80`,
                                borderRadius: "3px",
                            },
                            "*": {
                                scrollbarWidth: "thin",
                                scrollbarColor: `${theme.palette.primary.light}80 transparent`,
                            },
                            "*:not(.MuiTableContainer-root)": {
                                scrollbarWidth: "none",
                            },
                            "*::-moz-scrollbar-thumb": {
                                backgroundColor: `${theme.palette.primary.light}80`,
                            },
                            [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
                                "*::-webkit-scrollbar": {
                                    height: "4px",
                                },
                            },

                            body: {
                                width: "100vw",
                                height: "100vh",
                            },
                            "#__next": {
                                width: "100%",
                                height: "100%",
                            },
                        }}
                    />

                    <CssBaseline/>
                    {children}
                </ThemeProvider>
            </CacheProvider>
        </NoSsrHandler>
    );
};