import React from "react";

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
    user_introduction: string,
    headerSubtitle: string,
    loginUrl: string,
    window: any,
    permissions: string[],
    sidebarMenu: ISidebarMenuList,
    headerProfileItems: { key: number | string, name: string, route: string, icon: any }[],
    urlNotification: string,
    middlewares: {
        list: React.FC<any>[] | []
        props: {}
    }
    BC_segmentsToRemove?: string[],
    BC_isVisible?: boolean
}

export interface HeaderProps extends IDashboardProps {
    drawerWidth: number,
    handleDrawerToggle: any,
    headerProfileItems: { key: number | string, name: string, route: string, icon: any }[]
}

export interface HeaderProfileProps extends HeaderProps {
    handleCloseUserMenu: any
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