import {toast} from "react-toastify";
import {IPushToastList} from "../../../@types/toast";

const PendingNotification = (pushToastList: IPushToastList, notificationType: string, t: any) => {
    const toastId = toast(t("notifications.pending"), {
        containerId: 'validation',
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
        draggable: false,
    });
    pushToastList(notificationType, toastId);
};

export default PendingNotification;