import {useRouter} from "next/router";
import React from "react";
import {PagePermission} from "../../components";
import {useConfig} from "../../hooks";

export const PageMiddleware: React.FC<React.PropsWithChildren> = ({children}) => {
    const {config} = useConfig()
    const router = useRouter()
    const middleware = config.middlewares[router.route]

    if (!middleware) return children

    if (middleware.status) return children

    return (<PagePermission middleware={middleware}/>)
}