import {useContext} from "react";
import {LanguageContext} from "../../contexts";

interface IUseDirection {
    directionApp: string,
}

export const useDirection = (): IUseDirection => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("useDirection must be used within a LanguageProvider");
    }

    return {directionApp: context.directionApp};
};
