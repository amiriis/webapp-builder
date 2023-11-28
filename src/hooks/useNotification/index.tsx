import useSWR, {Fetcher} from 'swr'
import {useRequest} from "../useRequest";

export const useNotification = (url: string) => {

    const requestServer = useRequest({auth: true, notification: false})

    const fetcher: Fetcher<any> = (...args: any) => requestServer(args, 'get').then((response: any) => {
        return response.data.data;
    }).catch(() => {
    })

    const {
        data,
        mutate
    } = useSWR(url, fetcher, {keepPreviousData: true})

    return {notification_count: data, update_notification: mutate}
}