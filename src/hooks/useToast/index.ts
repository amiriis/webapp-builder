import {useContext} from "react";
import {IDismissToastList, IPushToastList, IToastActionKind, IToastContext} from "../../@types/toast";
import {ToastContext} from "../../contexts";

interface IUseToast extends IToastContext {
    pushToastList: IPushToastList,
    dismissToastList: IDismissToastList,
}

export const useToast = (): IUseToast => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }

    const pushToastList: IPushToastList = (toast_type, toast_id) => {
        context.dispatch({type: IToastActionKind.PUSH, toast_type, toast_id});
    };

    const dismissToastList: IDismissToastList = (toast_type) => {
        context.dispatch({type: IToastActionKind.DISMISS, toast_type});
    };

    return {
        ...context,
        pushToastList,
        dismissToastList
    }
};