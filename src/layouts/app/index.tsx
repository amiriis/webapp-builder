import NextNProgress from "nextjs-progressbar";
import React, {ReactNode, useEffect} from "react";
import {useLanguage, useLoading, useUser} from "../../hooks";
import {useTheme} from "@mui/material/styles";

export const AppLayout: React.FC<React.PropsWithChildren<{
    isBot: boolean,
    headComponent: ReactNode | (() => ReactNode)
}>> = ({
           children,
           isBot,
           headComponent
       }) => {
    const theme = useTheme()
    const {languageIsReady} = useLanguage();
    const {setLoadingPage} = useLoading();
    const {userChangedLanguage, token, isAuth} = useUser();

    useEffect(() => {
        if (languageIsReady) {
            if (token) {
                if (isAuth) {
                    if (userChangedLanguage) {
                        setLoadingPage(true);
                        return;
                    }
                    setLoadingPage(false);
                    return;
                }
                setLoadingPage(true);
                return;
            }
            setLoadingPage(false);
            return;
        }
        setLoadingPage(true);
    }, [languageIsReady, token, isAuth, userChangedLanguage]);

    if (!isBot) {
        if (userChangedLanguage) return;
        if (!languageIsReady) return;
    }

    return (
        <>
            {typeof headComponent === "function" ? headComponent() : headComponent}
            <NextNProgress
                color={theme.palette.secondary.dark}
                options={{showSpinner: false}}
            />
            {children}
        </>
    );
}