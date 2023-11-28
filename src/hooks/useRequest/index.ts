import axios from "axios";
import {useTranslations} from "next-intl";
import {useUser} from "../useUser";
import {useToast} from "../useToast";
import NotificationManager from "../../components/notifications/notificationManager";
import {errorRequest, errorResponse, errorSetting, successRequest} from "../../utils";
import {useNetwork} from "../useNetwork";

const defaultOptions = {
    auth: false, data: {}, requestOptions: {
        headers: {}
    }, notification: true, pending: true, success: {
        notification: {
            show: true,
        },
    }, failed: {
        notification: {
            show: true,
        },
    },
}
export const useRequest = (initOptions: any) => {
    const network = useNetwork()
    const t = useTranslations()
    const {token, clearToken} = useUser()
    const {pushToastList, dismissToastList} = useToast();
    let _options = {...defaultOptions, ...initOptions}

    function requestServer(url = '', method = 'get', options?: any) {
        _options = {..._options, ...options}
        if (_options.auth) _options = {
            ..._options, requestOptions: {
                ..._options.requestOptions,
                headers: {..._options.requestOptions.headers, authorization: `Bearer ${token}`}
            }
        }
        return new Promise((resolve, reject) => {
            if (!network.isOnline) {
                reject()
                return
            }
            if (_options.notification && _options.failed.notification.show && _options.pending) {
                dismissToastList(["pending", "warning", "error", "success"]);
                NotificationManager(pushToastList, "pending", t);
            }

            axios({
                url: url, method: method, data: _options.data, ..._options.requestOptions
            })
                .then(response => {
                    successRequest(pushToastList, dismissToastList, response, t, _options)
                    resolve(response)
                })
                .catch(error => {
                    if (error.response) {
                        errorResponse(pushToastList, dismissToastList, error.response, clearToken, t, _options.notification && _options.failed.notification.show)
                    } else if (error.request) {
                        errorRequest(dismissToastList, t, _options.notification && _options.failed.notification.show)
                    } else {
                        errorSetting(dismissToastList, t, _options.notification && _options.failed.notification.show)
                    }
                    reject(error)
                }).finally(() => {
                dismissToastList(['pending'])
            })
        });
    }

    return requestServer
}