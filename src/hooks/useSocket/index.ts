import {useContext} from "react";
import {SocketContext} from "../../contexts";
import {Socket} from "socket.io-client";

interface IUseSocket extends Socket {
}

const useSocket = (): IUseSocket => {
    const context = useContext(SocketContext)

    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }

    return context.socket
}

export default useSocket