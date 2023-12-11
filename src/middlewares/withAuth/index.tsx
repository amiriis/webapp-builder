import React from "react";
import {useUser} from "../../hooks";
import {WithAuthComponent} from "../../components";

export const WithAuthMiddleware: React.FC<React.PropsWithChildren<{ loginUrl: string }>> = (props) => {
    const {isAuth} = useUser();

    return isAuth ? <>{props.children}</> : <WithAuthComponent loginUrl={props.loginUrl}/>;
};