import {Divider, List} from "@mui/material";
import React, {Fragment, useEffect, useReducer, useState} from "react";
import {useRouter} from "next/router";
import {
    ISidebarMenuList,
    SidebarDrawerAndListProps,
    SidebarListAction,
    SidebarListActionEnum
} from "../../../../../../@types/dashboard";
import {useUser} from "../../../../../../hooks";
import SidebarListItem from "./sidebarListItem";

function reducer(state: ISidebarMenuList, action: SidebarListAction) {
    switch (action.type) {
        case SidebarListActionEnum.COLLAPSE_MENU:
            return state.map((itemsArr) =>
                itemsArr.map((item) =>
                    action.key === item.key ? {...item, showSubItem: !item.showSubItem} : item
                )
            );
        case SidebarListActionEnum.SELECTED:
            return state.map((itemsArr) =>
                itemsArr.map((item) => {
                    return item.type === "page"
                        ? {...item, selected: action.route === item.route, routing: false}
                        : item.subItem && Array.isArray(item.subItem)
                            ? {
                                ...item,
                                subItem: item.subItem.map((_subItem) => ({
                                    ..._subItem,
                                    selected: _subItem.route === action.route,
                                    routing: false
                                })),
                                showSubItem: item.subItem.some(
                                    (_subItem) => _subItem.selected
                                ),
                            }
                            : item;
                })
            );
        case SidebarListActionEnum.SELECTING:
            return state.map((itemsArr) =>
                itemsArr.map((item) => {
                    return item.type === "page"
                        ? {...item, selected: action.route === item.route, routing: action.route === item.route}
                        : item.subItem && Array.isArray(item.subItem)
                            ? {
                                ...item,
                                subItem: item.subItem.map((_subItem) => ({
                                    ..._subItem,
                                    selected: _subItem.route === action.route,
                                    routing: _subItem.route === action.route
                                })),
                                showSubItem: item.subItem.some(
                                    (_subItem) => _subItem.selected
                                ),
                            }
                            : item;
                })
            );
        default:
            throw new Error();
    }
}


const SidebarList: React.FC<SidebarDrawerAndListProps> = (props) => {
    const [itemMenu, dispatch] = useReducer(reducer, props.sidebarMenu);
    const {user} = useUser();
    const router = useRouter();
    const [selectedKey, setSelectedKey] = useState<string | null>(null);

    useEffect(() => {
        dispatch({type: SidebarListActionEnum.SELECTED, route: router.pathname});
        setSelectedKey(router.pathname);
        const handlerStartRoute = (url: string) => {
            dispatch({type: SidebarListActionEnum.SELECTING, route: url});
        }

        router.events.on('routeChangeStart', handlerStartRoute)

        return () => {
            router.events.off('routeChangeStart', handlerStartRoute)
        }
    }, [router]);


    useEffect(() => {
        selectedKey && document.querySelector(`[data-route="${selectedKey}"]`)?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, [selectedKey]);

    return (
        <List dense={true} sx={{overflow: "scroll", p: 0}}>
            {itemMenu.map((itemArr, index) => (
                <Fragment key={index}>
                    {itemArr.map((item) =>
                        <Fragment key={item.key}>
                            {(user?.permissions?.includes(item.permission || 'nothing') || item.permission === "all") &&
                                <SidebarListItem
                                    item={item}
                                    dispatch={dispatch}
                                    {...props}
                                />}
                        </Fragment>
                    )}
                    <Divider/>
                </Fragment>
            ))}
        </List>

    );
}

export default SidebarList