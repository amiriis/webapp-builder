import pendingNotification from "./PendingNotification";
import WarningNotification from "./WarningNotification";
import ErrorNotification from "./ErrorNotification";
import SuccessNotification from "./SuccessNotification";
const NotificationsManager = (pushToastList, notificationType, t, status, message) => {
  switch (notificationType) {
    case "pending":
      pendingNotification(pushToastList, notificationType, t);
      break;
    case "warning":
      WarningNotification(pushToastList, notificationType, t, status);
      break;
    case "error":
      if (message) {
        ErrorNotification(pushToastList, notificationType, t, status, message);
      } else {
        ErrorNotification(pushToastList, notificationType, t, status);
      }
      break;
    case "success":
      SuccessNotification(pushToastList, notificationType, t, status);
      break;
  }
};
export default NotificationsManager;