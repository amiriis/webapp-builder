import {
    Badge,
    CircularProgress,
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import {useTranslations} from "next-intl";
import React from "react";
import {NextLinkComposed} from "../../../../../../../../utils";
import {IMenuItem, SidebarListItemProps} from "../../../../../../../../@types/dashboard";

const SidebarListSubItem: React.FC<SidebarListItemProps> = (props) => {
    const t = useTranslations();
    const {notification_count} = props.notificationServer
    const renderBadge = (_subItem: IMenuItem) => (
        <IconButton>
            <Badge
                badgeContent={notification_count ? notification_count[_subItem.name] : 0}
                color="error"
                variant="standard"
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            />
        </IconButton>
    );

    return (
        <Collapse in={props.item.showSubItem} timeout="auto" mountOnEnter={true} unmountOnExit={true}>
            <List dense={true} component="div" disablePadding sx={{bgcolor: "#f6f6f6", pr: 0}}>
                {props.item.subItem && props.item.subItem.map((_subItem) => (
                    <ListItem key={_subItem.key} disablePadding secondaryAction={renderBadge(_subItem)}>
                        <ListItemButton
                            selected={_subItem.selected}
                            component={NextLinkComposed}
                            to={{
                                pathname: _subItem.route,
                            }}
                            sx={{
                                minHeight: 48,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    justifyContent: "center",
                                    width: 40,
                                    height: 24,
                                    pr: 2,
                                }}
                            >
                                {_subItem.routing ?
                                    <CircularProgress size={24} color="inherit"/> : _subItem.icon}
                            </ListItemIcon>
                            <ListItemText primary={t(_subItem.key)} secondary={
                                _subItem.secondary !== undefined ? (
                                    <Typography variant="caption" color="textSecondary">
                                        {t(_subItem.secondary)}
                                    </Typography>
                                ) : null
                            }/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Collapse>

    );
};

export default SidebarListSubItem;