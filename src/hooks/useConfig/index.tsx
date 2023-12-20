import {useContext} from "react";
import {ConfigContext} from "../../contexts";
import {IConfigProps} from "../../@types/config";

interface IUseConfig extends IConfigProps {
}

export const useConfig = (): IUseConfig => {
    const context = useContext(ConfigContext);

    if (!context) {
        throw new Error("useConfig must be used within a ConfigProvider");
    }

    return {config: context.config};
};
