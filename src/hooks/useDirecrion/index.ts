import {useContext} from "react";
import {LanguageContext} from "../../contexts";
import {Direction} from "../../@types/language";

interface IUseDirection {
    directionApp: Direction,
}

export const useDirection = (): IUseDirection => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("useDirection must be used within a LanguageProvider");
    }

    return {directionApp: context.directionApp};
};
