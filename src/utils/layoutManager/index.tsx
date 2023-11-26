import React, {Fragment} from "react";
import {ILayoutInput} from "../../@types/layout";

export const LayoutManager: React.FC<React.PropsWithChildren<{ layout: ILayoutInput, layoutList: any }>> = ({
                                                                                                                children,
                                                                                                                layout,
                                                                                                                layoutList
                                                                                                            }) => {
    const Component = layoutList[layout?.name] || Fragment
    const props = layout?.props || {}

    return (
        <Component {...props}>
            {children}
        </Component>
    )
}