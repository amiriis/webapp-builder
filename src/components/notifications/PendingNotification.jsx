import {toast} from "react-toastify";

const PendingNotification = (pushToastList, notificationType, t) => {
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