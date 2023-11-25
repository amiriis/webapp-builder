import React from "react";

export const AppPermission: React.FC<React.PropsWithChildren<{
    permissions: string[],
    globalHasValue: any
}>> = ({children, permissions, globalHasValue}) => {
    const hasPermissionsValue = globalHasValue ? JSON.parse(globalHasValue) : [];
    return permissions.some(permission => hasPermissionsValue.includes(permission)) ? <>{children}</> : null;
};