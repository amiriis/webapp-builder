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
                    <Typography sx={{textAlign: "center"}}>
                        {t("Authorization.typography_your_login_is_valid_and_you_do_not_need_to_login_again")}
                    </Typography>
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