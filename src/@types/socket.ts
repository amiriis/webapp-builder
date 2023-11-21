export interface ISocketContext {
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
