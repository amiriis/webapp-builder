import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
    Badge,
    CircularProgress,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import {useTranslations} from "next-intl";
import React from "react";
import {NextLinkComposed} from "../../../../../../../utils";
import {SidebarListActionEnum, SidebarListItemProps} from "../../../../../../../@types/dashboard";
import SidebarListSubItem from "./sidebarListSubItem";
import {useNotification} from "../../../../../../../hooks";

const SidebarListItem: React.FC<SidebarListItemProps> = (props) => {
    const t = useTranslations();
    const {notification_count} = useNotification(props.urlNotification)
    const hasSubItems = props.item.type === "menu" && props.item.subItem && props.item.subItem.length > 0;
    const renderBadge = () => {
        return !hasSubItems ? (
            <IconButton>
                <Badge
                    badgeContent={notification_count ? notification_count[props.item.name] : 0}
                    color="error"
                    variant="standard"
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                />
            </IconButton>
        ) : null;
    };

    return (
        <>
            <ListItem data-route={props.item.route} disablePadding secondaryAction={renderBadge()}>
                <ListItemButton
                    selected={props.item.selected}
                    {...(props.item.type == "page" && {
                        component: NextLinkComposed,
                        to: {
                            pathname: props.item.route,
                        },
                    })}
                    onClick={() => {
                        if (hasSubItems) {
                            props.dispatch({type: SidebarListActionEnum.COLLAPSE_MENU, key: props.item.key});
                        }
                        props.handleDrawerToggle()
                    }}
                    sx={{
                        minHeight: 48,
                    }}

                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            justifyContent: "center",
                            color: "primary.main",
                            width: 40,
                            height: 24,
                            pr: 2,
                        }}
                    >
                        {props.item.routing ? <CircularProgress size={24} color="inherit"/> : props.item.icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={t(props.item.key)}
                        secondary={
                            props.item.secondary !== undefined ? (
                                <Typography variant="caption" color="textSecondary">
                                    {t(props.item.secondary)}
                                </Typography>
                            ) : null
                        }
                    />

                    {hasSubItems && (props.item.showSubItem ? <ExpandLess/> : <ExpandMore/>)}
                </ListItemButton>
            </ListItem>
            {props.item.subItem && (
                <SidebarListSubItem {...props}/>
            )}
        </>
    );
};

export default SidebarListItem;