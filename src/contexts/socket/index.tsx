import React, {createContext, useEffect, useMemo, useRef, useState} from "react";
import {io, Socket} from "socket.io-client";
import {useTranslations} from "next-intl";
import {Id, toast} from "react-toastify";
import PowerIcon from "@mui/icons-material/Power";
import PowerOffIcon from "@mui/icons-material/PowerOff";
import {useDirection, useUser} from "../../hooks";
import {ClientToServerEvents, ISocketContext, ServerToClientEvents} from "../../@types/socket";

export const SocketContext = createContext<ISocketContext | undefined>(undefined)

export const SocketProvider: React.FC<React.PropsWithChildren<{ urlServerSocket: string }>> = ({children, urlServerSocket}) => {
    const {user, isAuth} = useUser()
    const [connectionError, setConnectionError] = useState(false)
    const socketToastId: React.MutableRefObject<Id> = useRef(0);
    const t = useTranslations()
    const {directionApp} = useDirection();
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = useMemo(() => io(urlServerSocket, {
        autoConnect: false,
        auth: {
            token: isAuth ? user.telephone_id : ""
        }
    }), [isAuth])

    useEffect(() => {
        const connectErrorHandler = () => {
            setConnectionError(true)
        }
        const connectHandler = () => {
            setConnectionError(false)
        }
        socket.on("connect_error", connectErrorHandler);
        socket.on("connect", connectHandler);

        return () => {
            socket.off("connect_error", connectErrorHandler);
            socket.off("connect", connectHandler);
        }
    }, []);

    useEffect(() => {
        if (!connectionError) {
            toast.update(socketToastId.current, {
                type: toast.TYPE.SUCCESS,
                render: t('socket_is_connect_message'),
                autoClose: 2000,
                closeButton: true,
                closeOnClick: true,
                icon: <PowerIcon/>
            });
            return
        }
        socketToastId.current = toast.warn(t('socket_is_not_connect_message'), {
            containerId: 'connection',
            draggable: false,
            autoClose: false, closeButton: false, closeOnClick: false, icon: <PowerOffIcon/>
        })

    }, [connectionError]);

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}