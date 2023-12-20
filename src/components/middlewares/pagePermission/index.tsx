import React from "react";
import {CenterLayout, FullPageLayout} from "../../../layouts";
import {Typography} from "@mui/material";
import {SvgMaintenance} from "../../svgs/SvgMaintenance";

export const PagePermission: React.FC<{ middleware: { title: string, message: string } }> = ({middleware}) => {
    return (
        <FullPageLayout>
            <CenterLayout spacing={3}>
                <SvgMaintenance height={200} width={200}/>
                <Typography variant={'h5'}>{middleware.title || ''}</Typography>
                <Typography>{middleware.message || ''}</Typography>
            </CenterLayout>
        </FullPageLayout>
    )
}