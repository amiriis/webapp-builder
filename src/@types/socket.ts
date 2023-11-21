import {Socket} from "socket.io-client";

export interface ISocketContext {
    socket: Socket
}

export interface ServerToClientEvents {
    [key: string]: (arg: string) => void
}

export interface ClientToServerEvents {
    [key: string]: (arg: string) => void
}

export interface SocketAuth {
    token: string;
}
