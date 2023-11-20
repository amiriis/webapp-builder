import React, {createContext, useState} from "react";
import {ILoadingContext} from "../../@types/loading";

export const LoadingContext = createContext<ILoadingContext | undefined>(undefined)

export const LoadingProvider: React.FC<React.PropsWithChildren<{
    LoadingComponent: React.FC<{ loading: boolean }>
}>> = ({children, LoadingComponent}) => {
    const [loadingPage, setLoadingPage] = useState(false);
    return (
        <LoadingContext.Provider value={{loadingPage, setLoadingPage}}>
            <LoadingComponent loading={loadingPage}/>
            {children}
        </LoadingContext.Provider>
    );
};