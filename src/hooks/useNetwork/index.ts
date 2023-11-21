import {INetworkContext} from "../../@types/network";
import {useContext} from "react";
import {NetworkContext} from "../../contexts/network";

interface IUseNetwork extends INetworkContext {
}

const useNetwork = (): IUseNetwork => {
    const context = useContext(NetworkContext)

    if (!context) {
        throw new Error("useNetwork must be used within a NetworkProvider");
    }

    return {...context}
}

export default useNetwork;