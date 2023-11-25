import {NoSsr} from "@mui/material";
import React from "react";

export const NoSsrHandler: React.FC<React.PropsWithChildren<{ isBot: boolean }>> = ({children, isBot}) => {
    if (isBot) return children;
    return <NoSsr>{children}</NoSsr>;
};