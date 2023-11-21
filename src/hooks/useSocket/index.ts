import {useContext} from "react";
import {SocketContext} from "../../contexts";
import {ISocketContext} from "../../@types/socket";

interface IUseSocket extends ISocketContext {
}

const useSocket = (): IUseSocket => {
    const context = useContext(SocketContext)

    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }

    return context
}

export default useSocket