import React, {Fragment, useEffect, useState} from "react";
import {ILayoutInput} from "../../@types/layout";
import {resolve} from "app-root-path";

const rootApp = resolve('/src/layouts/list')
export const LayoutManager: React.FC<React.PropsWithChildren<{ layout: ILayoutInput }>> = ({children, layout}) => {
    const [layoutList, setLayoutList] = useState<any | null>(null);

    useEffect(() => {
        const importLayoutList = async () => {
            const module = await import(rootApp);
            setLayoutList(module);
        };

        importLayoutList();
    }, []);

    if (!layoutList) {
        return null;
    }

    const Component = (layoutList as any)[layout?.name] || Fragment
    const props = layout?.props || {}

    return (
        <Component {...props}>
            {children}
        </Component>
    )
}