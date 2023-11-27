import {Typography} from "@mui/material";
import {useTranslations} from "next-intl";
import React from "react";
import {LinkRouting} from "../../../../../utils";

const BreadcrumbItem: React.FC<React.PropsWithChildren<{ index: any, RouterArray: any, label: string }>> = (props) => {
    const t = useTranslations();
    const isLast = props.index === props.RouterArray.length - 1;
    const url = `/${props.RouterArray.slice(0, props.index + 1).join("/")}`;

    return isLast ? (
        <Typography variant="body2" color="primary">
            {t("sidebar." + props.label)}
        </Typography>
    ) : (
        <LinkRouting underline="hover" color="inherit" passHref href={url}>
            <Typography variant="body2">{t("sidebar." + props.label)}</Typography>
        </LinkRouting>
    );
}
export default BreadcrumbItem