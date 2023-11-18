import axios from "axios";
import {errorRequest, errorResponse, errorSetting} from "../utils/errorHandler";
import {successRequest} from "../utils/succesHandler";
import {useTranslations} from "next-intl";
import useUser from "../hooks/useUser";
import useNetwork from "../hooks/useNetwork";
import Notifications from "../components/notifications";
import useToast from "../hooks/useToast";

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
const useRequest = (initOptions) => {
    const network = useNetwork()
    const t = useTranslations()
    const {token, clearToken} = useUser()
    const {pushToastList, dismissToastList} = useToast();
    let _options = {...defaultOptions, ...initOptions}

    function requestServer(url = '', method = 'get', options) {
        _options = {..._options, ...options}
        if (_options.auth) _options = {
            ..._options, requestOptions: {
                ..._options.requestOptions,
                headers: {..._options.requestOptions.headers, authorization: `Bearer ${token}`}
            }
        }
        return new Promise((resolve, reject) => {
            if (!network.online) {
                reject()
                return
            }
            if (_options.notification && _options.failed.notification.show && _options.pending) {
                dismissToastList(["pending", "warning", "error", "success"]);
                Notifications(pushToastList, "pending", t);
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
                })
        });
    }

    return requestServer
}

export default useRequest