import {useContext} from "react";
import {IToastActionKind, IToastContext} from "../../@types/toast";
import {ToastContext} from "../../contexts";

interface IUseToast extends IToastContext {
    pushToastList: (toast_type: string, toast_id: string | number) => void,
    dismissToastList: (toast_type: string) => void,
}

export const useToast = (): IUseToast => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }

    const pushToastList = (toast_type: string, toast_id: string | number) => {
        context.dispatch({type: IToastActionKind.PUSH, toast_type, toast_id});
    };

    const dismissToastList = (toast_type: string) => {
        context.dispatch({type: IToastActionKind.DISMISS, toast_type});
    };

    return {
        ...context,
        pushToastList,
        dismissToastList
    }
};