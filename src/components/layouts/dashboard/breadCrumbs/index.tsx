import {useRouter} from "next/router";
import {Box, Breadcrumbs} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {NavigateBefore, NavigateNext} from "@mui/icons-material";
import React from "react";
import BreadcrumbItem from "./breadCrumbItem";
import {IDashboardProps} from "../../../../@types/dashboard";

const BreadCrumbs: React.FC<React.PropsWithChildren<IDashboardProps>> = ({
                                                                             BC_isVisible = true,
                                                                             BC_segmentsToRemove
                                                                         }) => {
    const theme = useTheme();
    const router = useRouter();

    if (!BC_isVisible) {
        return null;
    }

    const {pathname} = router;
    const RouterArray = pathname.split("/").filter((segment) => segment !== "");

    const segmentsToRemove = BC_segmentsToRemove || [];

    segmentsToRemove.forEach((segmentToRemove) => {
        const index = RouterArray.indexOf(segmentToRemove);
        if (index !== -1) {
            RouterArray.splice(index, 1);
        }
    });

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
