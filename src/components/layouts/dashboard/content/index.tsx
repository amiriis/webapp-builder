import React, {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import {useTranslations} from "next-intl";
import {FullPageLayout} from "../../../../layouts";
import {RolePermissionMiddleware} from "../../../../middlewares";
import {LoadingHardPage} from "../../../loadingHardPage";
import BreadCrumbs from "../breadCrumbs";
import {IDashboardProps} from "../../../../@types/dashboard";

const Content: React.FC<React.PropsWithChildren<IDashboardProps>> = (props) => {
    const t = useTranslations()
    const router = useRouter()
    const [routing, setRouting] = useState(false)
    const [routingItem, setRoutingItem] = useState<{ icon?: any, key?: string }>({})
    const pageList = useMemo(() => {
        const list = []
        for (const menu of props.sidebarMenu) {
            for (const item of menu) {
                if (item.type === 'menu') {
                    if (item.subItem) {
                        for (const subItem of item.subItem) {
                            list.push(subItem)
                        }
                    }
                } else {
                    list.push(item)
                }
            }
        }

        return list
    }, [])

    useEffect(() => {
        const handlerStartRoute = (url: string) => {
            const foundPage = pageList.find(page => page.route === url)
            if (foundPage) {
                setRoutingItem(foundPage);
            } else {
                setRoutingItem({});
            }
            setRouting(true)
        }
        const handlerCompleteRoute = () => {
            setRouting(false)
        }

        router.events.on('routeChangeStart', handlerStartRoute)
        router.events.on('routeChangeComplete', handlerCompleteRoute)

        return () => {
            router.events.off('routeChangeStart', handlerStartRoute)
            router.events.off('routeChangeComplete', handlerCompleteRoute)
        }
    }, [router]);

    return (
        <FullPageLayout sx={{mt: 3, position: 'relative'}}>
            <LoadingHardPage icon={routingItem?.icon}
                             label={routingItem?.key ? `${t('routing_to')} ${t(routingItem?.key)}` : ''}
                             loading={routing} width={100} height={100}
                             sx={{position: "absolute", bgcolor: "#fffc"}}>
                <RolePermissionMiddleware requiredPermissions={props.permissions}>
                    <BreadCrumbs {...props}/>
                    {props.children}
                </RolePermissionMiddleware>
            </LoadingHardPage>
        </FullPageLayout>
    )
}

export default Content