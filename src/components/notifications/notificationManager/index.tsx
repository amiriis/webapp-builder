import pendingNotification from "../pendingNotification";
import WarningNotification from "../warningNotification";
import ErrorNotification from "../errorNotification";
import {IPushToastList} from "../../../@types/toast";
import SuccessNotification from "../successNotification";

const NotificationManager = (pushToastList: IPushToastList, notificationType: string, t: any, status?: any, message?: string) => {
    switch (notificationType) {
        case "pending":
            pendingNotification(pushToastList, notificationType, t);
            break;
        case "warning":
            WarningNotification(pushToastList, notificationType, t, status);
            break;
        case "error":
            if (message) {
                ErrorNotification(pushToastList, notificationType, t, status, message)
            } else {
                ErrorNotification(pushToastList, notificationType, t, status)
            }
            break;
        case "success":
            SuccessNotification(pushToastList, notificationType, t, status);
            break;
    }
};

export default NotificationManager;