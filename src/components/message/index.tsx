import React, {ReactNode} from "react";
import {CenterLayout, FullPageLayout} from "../../layouts";
import {SvgLoading} from "../svgs";

export const Message: React.FC<{ text: ReactNode, actions?: ReactNode }> = ({text, actions}) => {
    return (
        <FullPageLayout sx={{p: 1}}>
            <CenterLayout spacing={3}>
                <SvgLoading width={100}
                            height={100}/>
                {text}
                {actions}
            </CenterLayout>
        </FullPageLayout>
    );
};