import React from "react";
import {useUser} from "../../hooks";
import {WithAuthComponent} from "../../components";

export const WithAuthMiddleware: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    const {isAuth} = useUser();

    return isAuth ? <>{children}</> : <WithAuthComponent/>;
};