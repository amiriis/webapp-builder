import {Button, Typography} from "@mui/material";
import {useTranslations} from "next-intl";
import {Message} from "../../message";
import {NextLinkComposed} from "../../../utils";
import React from "react";

export const RolePermissionComponent = () => {
    const t = useTranslations();

    return (
        <Message
            text={
                <Typography sx={{textAlign: "center"}}>
                    {t("Permission.typography_you_dont_have_access")}
                </Typography>
            }
            actions={
                <>
                    <Button
                        variant="contained"
                        component={NextLinkComposed}
                        to={{
                            pathname: "/dashboard",
                        }}
                    >
                        {t("Permission.button_back_dashboard")}
                    </Button>
                </>
            }
        />
    );
};