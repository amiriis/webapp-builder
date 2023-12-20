import {Stack, Typography} from "@mui/material";
import {useTranslations} from "next-intl";
import {Message} from "../../message";
import React from "react";

export const WithoutAuthComponent: React.FC<{ backUrlDecodedPath: string }> = ({backUrlDecodedPath}) => {
    const t = useTranslations();

    return (
        <Message
            text={
                <Stack alignItems="center" spacing={2}>
                    <Typography>
                        {t("Authorization.typography_redirect_to")}{" "}
                        {backUrlDecodedPath
                            ? t("Authorization.typography_routing_previuos_page")
                            : t("Authorization.typography_routing_dashbaord_page")}
                    </Typography>
                </Stack>
            }
        />
    );
};