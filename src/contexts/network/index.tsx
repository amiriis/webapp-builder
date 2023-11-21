import React, {createContext, useEffect, useRef, useState} from "react";
import {Id, toast} from "react-toastify";
import {useTranslations} from "next-intl";
import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import {INetworkContext} from "../../@types/network";

export const NetworkContext = createContext<INetworkContext | undefined>(undefined)

export const NetworkProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    const [isOnline, setOnline] = useState(() => {
        return navigator.onLine;
    });

    const networkToastId: React.MutableRefObject<Id> = useRef(0);
    const t = useTranslations()

    useEffect(() => {
        const handleOnline = () => {
            setOnline(true);
        };
        const handleOffline = () => {
            setOnline(false);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    useEffect(() => {
        if (isOnline) {
            toast.update(networkToastId.current, {
                type: toast.TYPE.SUCCESS,
                render: t('online_message'),
                autoClose: 2000,
                closeButton: true,
                closeOnClick: true,
                icon: <WifiIcon/>
            });
            return
        }
        networkToastId.current = toast.warn(t('offline_message'), {
            containerId: 'connection',
            draggable: false,
            autoClose: false, closeButton: false, closeOnClick: false, icon: <WifiOffIcon/>
        })
    }, [isOnline]);

    return (
        <NetworkContext.Provider value={{isOnline}}>
            {children}
        </NetworkContext.Provider>
    )
}