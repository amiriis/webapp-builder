import React, {Fragment} from "react";
import {ILayoutInput} from "../../@types/layout";
import {resolve} from "app-root-path";

let layoutList: any = {}
try {
    const rootApp = resolve('/src/layouts/list')
    console.log('rootApp', rootApp)
    // layoutList = rootApp('/src/layouts/list');
    // console.log('start:', layoutList)
} catch (error) {
    console.log('error1')
    console.log(error)
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