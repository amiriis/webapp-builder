import React from "react";
import {useUser} from "../../hooks";
import {RolePermissionComponent} from "../../components";

export const RolePermissionMiddleware: React.FC<React.PropsWithChildren<{
    requiredPermissions?: string[]
}>> = ({children, requiredPermissions = []}) => {
    const {user} = useUser();

    const hasPermission = requiredPermissions.length === 0 ? true : requiredPermissions.some((permission) =>
        user?.permissions?.includes(permission)
    );

    return !hasPermission ? <RolePermissionComponent/> : <>{children}</>;
};