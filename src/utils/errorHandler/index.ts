import {IDismissToastList, IPushToastList} from "../../@types/toast";
import {IUserCleanToken} from "../../@types/user";
import NotificationManager from "../../components/notifications/notificationManager";

export const errorSetting = (dismissToastList: IDismissToastList, t: any, notification: boolean) => {
    if (notification) {
        dismissToastList(["pending", "warning", "error", "success"])
    }
}
export const errorRequest = (dismissToastList: IDismissToastList, t: any, notification: boolean) => {
    if (notification) {
        dismissToastList(["pending", "warning", "error", "success"])
    }
}

export const errorResponse = (pushToastList: IPushToastList, dismissToastList: IDismissToastList, response: any, clearToken: IUserCleanToken, t: any, notification: boolean) => {
    if (notification) {
        dismissToastList(["pending", "warning", "error", "success"])
    }
    if (isServerError(response.status)) {
        errorServer(pushToastList, response, t, notification)
    } else if (isClientError(response.status)) {
        errorClient(pushToastList, response, clearToken, t, notification)
    }
}

const errorServer = (pushToastList: IPushToastList, response: any, t: any, notification: boolean) => {
    if (notification) NotificationManager(pushToastList, "warning", t, response.status);
}
const errorClient = (pushToastList: IPushToastList, response: any, clearToken: IUserCleanToken, t: any, notification: boolean) => {
    switch (response.status) {
        case 401:
            clearToken()
            if (notification) NotificationManager(pushToastList, "error", t, response.status);
            break;
        case 422:
            if ('type' in response.data) {
                errorLogic(pushToastList, response, t, notification)
                break;
            }
            errorValidation(pushToastList, response, t, notification)
            break;
        case 429:
            if (notification) NotificationManager(pushToastList, "error", t, response.status);
            break
        default:
            if (notification) NotificationManager(pushToastList, "error", t, response.status);
            break
    }
}

const isServerError = (status: number) => status >= 500 && status <= 599;
const isClientError = (status: number) => status >= 400 && status <= 499;

const errorLogic = (pushToastList: IPushToastList, response: any, t: any, notification: boolean) => {
    if (notification) NotificationManager(pushToastList, "error", t, response.status, response.data.message);
}
const errorValidation = (pushToastList: IPushToastList, response: any, t: any, notification: boolean) => {
    if (notification) {
        const errorsMap = Object.keys(response.data.errors)
        const errorsArray = response.data.errors

        errorsMap.map((item, index) => {
            NotificationManager(pushToastList, "error", t, response.status, errorsArray[item][0]);
        })
    }
}