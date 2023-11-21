import {IDismissToastList, IPushToastList} from "../../@types/toast";
import NotificationManager from "../../components/notifications/notificationManager";

export const successRequest = (pushToastList: IPushToastList, dismissToastList: IDismissToastList, response: any, t: any, options: any) => {
    if (options.notification && options.success.notification.show) {
        dismissToastList(["pending", "warning", "error", "success"])
        NotificationManager(pushToastList, "success", t, response.status);
    }
}