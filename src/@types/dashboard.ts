import React, {ReactNode} from "react";

export interface IMenuItem {
    key: string,
    secondary?: string,
    name: string,
    type: string,
    route: string,
    icon: any,
    selected: boolean,
    permission?: string,
    showSubItem?: boolean,
    routing?: boolean
}

export interface ISidebarMenu extends IMenuItem {
    subItem?: IMenuItem[]
}

export type ISidebarMenuList = ISidebarMenu[][]

export interface IDashboardProps {
    widget?: ReactNode,
    window: any,
    permissions: string[],
    sidebarMenu: ISidebarMenuList
    notificationServer: {
        notification_count?: object,
        update_notification?: any
    }
}

export interface SidebarProps extends IDashboardProps {
    container: Element | (() => Element | null) | null | undefined;
    mobileOpen: boolean;
    drawerWidth: number;
    handleDrawerToggle: any;
}

export interface SidebarDrawerAndListProps extends IDashboardProps {
    handleDrawerToggle: any;
}

export interface SidebarListItemProps extends IDashboardProps {
    item: ISidebarMenu,
    dispatch: React.Dispatch<SidebarListAction>;
    handleDrawerToggle: any;
    notificationServer: any;
}

export interface SidebarListAction {
    type: SidebarListActionEnum,
    key?: string,
    route?: string,
}

export enum SidebarListActionEnum {
    COLLAPSE_MENU = 'COLLAPSE_MENU',
    SELECTED = 'SELECTED',
    SELECTING = 'SELECTING'
}