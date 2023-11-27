import {useRouter} from "next/router";
import {Box, Breadcrumbs} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {NavigateBefore, NavigateNext} from "@mui/icons-material";
import React from "react";
import BreadcrumbItem from "./breadCrumbItem";

const BreadCrumbs: React.FC<React.PropsWithChildren<{ isVisible: boolean }>> = (props) => {
    const {isVisible} = props;
    const theme = useTheme();
    const router = useRouter();

    if (!isVisible) {
        return null;
    }

    const {pathname} = router;
    const RouterArray = pathname.split("/").filter((segment) => segment !== "");

    if (RouterArray.length === 1) {
        return null;
    }

    return (
        <Box p={3} component="span">
            <Breadcrumbs
                maxItems={2}
                separator={
                    theme.direction === "ltr" ? (
                        <NavigateNext fontSize="small"/>
                    ) : (
                        <NavigateBefore fontSize="small"/>
                    )
                }
                aria-label="breadcrumb"
            >
                {RouterArray.map((segment, index) => (
                    <BreadcrumbItem
                        RouterArray={RouterArray}
                        label={segment}
                        key={segment}
                        index={index}
                    />
                ))}
            </Breadcrumbs>
        </Box>
    );
};

export default BreadCrumbs;
