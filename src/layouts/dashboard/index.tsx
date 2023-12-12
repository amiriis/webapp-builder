import React from "react";
import {IDashboardProps} from "../../@types/dashboard";
import {Dashboard} from "../../components";
import {RecursiveComponent} from "../../utils";
import {WithAuthMiddleware} from "../../middlewares";

export const DashboardLayout: React.FC<React.PropsWithChildren<IDashboardProps>> = (props) => {
    const {middlewares, ...restProps} = props;
    return (
        <RecursiveComponent list={[WithAuthMiddleware, ...middlewares]} {...restProps}>
            <Dashboard {...props}/>
        </RecursiveComponent>
    );
};