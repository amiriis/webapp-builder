import {Button, Typography} from "@mui/material";
import {useRouter} from "next/router";
import {useTranslations} from "next-intl";
import {Message} from "../../message";
import React from "react";
import {NextLinkComposed} from "../../../utils";

export const WithAuthComponent: React.FC<{ loginUrl: string }> = (props) => {
    const router = useRouter();
    const t = useTranslations();

    return (
        <Message
            text={
                <Typography sx={{textAlign: "center"}}>
                    {t("Authorization.typography_your_access_to_this_page_has_expired_Please_login_again")}
                </Typography>
            }
            actions={
                <>
                    <Button
                        variant="contained"
                        component={NextLinkComposed}
                        to={{
                            pathname: props.loginUrl,
                            query: {back_url: encodeURIComponent(router.asPath)},
                        }}
                    >
                        {t("login")}
                    </Button>
                </>
            }
        />
    );
};