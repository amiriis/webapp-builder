import React, {Fragment} from "react";
import {ILayoutInput} from "../../@types/layout";

let layoutList: any = {}
try {
    console.log('start:', layoutList)
    layoutList = require('~/src/layouts/list');
} catch (error) {
}

export const LayoutManager: React.FC<React.PropsWithChildren<{ layout: ILayoutInput }>> = ({children, layout}) => {
    console.log('in:', layoutList)
    const Component = (layoutList as any)[layout?.name] || Fragment
    const props = layout?.props || {}

    return (
        <Component {...props}>
            {children}
        </Component>
    )
}