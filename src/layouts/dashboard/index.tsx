import React from "react";
import {WithAuthMiddleware} from "../../middlewares";
import {IDashboardProps} from "../../@types/dashboard";
import {Dashboard} from "../../components";

export const DashboardLayout: React.FC<React.PropsWithChildren<IDashboardProps>> = (props) => {
    return (
        <WithAuthMiddleware>
            <Dashboard {...props}/>
            {props.widget}
        </WithAuthMiddleware>
    );
};