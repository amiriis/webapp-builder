import React from "react";

interface RecursiveComponentProps {
    [key: string]: any,
}

export const RecursiveComponent: React.FC<RecursiveComponentProps> = (props) => {
    if (props.list.length === 0) {
        return props.children
    }

    const CurrentComponent = props.list[0];
    const remainingComponents = props.list.slice(1);

    return (
        <CurrentComponent {...props}>
            <RecursiveComponent {...props} list={remainingComponents}>
                {props.children}
            </RecursiveComponent>
        </CurrentComponent>
    )
}