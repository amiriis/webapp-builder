import React, {createContext} from "react";
import {IConfigProps} from "../../@types/config";

export const ConfigContext = createContext<IConfigProps | undefined>(undefined)

export const ConfigProvider: React.FC<React.PropsWithChildren<IConfigProps>> = ({children, config}) => {
    return <ConfigContext.Provider value={{config}}>{children}</ConfigContext.Provider>
}