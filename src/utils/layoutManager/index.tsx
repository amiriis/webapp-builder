import React, {Fragment, useEffect, useState} from "react";
import {ILayoutInput} from "../../@types/layout";
import {resolve} from "app-root-path";

const layoutList: any = async () => await import(resolve('src/layouts/list'));

export const LayoutManager: React.FC<React.PropsWithChildren<{ layout: ILayoutInput }>> = ({
                                                                                               children,
                                                                                               layout,
                                                                                           }) => {
    const [list, setList] = useState<any | null>(null);

    useEffect(() => {
        layoutList().then((_layoutList: any) => {
            setList(_layoutList)
        })
    }, []);

    if (!list) {
        return null; // or some loading indicator
    }

    const Component = list[layout?.name] || Fragment
    const props = layout?.props || {}

    return (
        <Component {...props}>
            {children}
        </Component>
    )
}