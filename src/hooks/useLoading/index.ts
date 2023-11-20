import {useContext} from "react";
import {LoadingContext} from "../../contexts";
import {ILoadingContext} from "../../@types/loading";

interface IUseLoading extends ILoadingContext {
}

const useLoading = (): IUseLoading => {
    const context = useContext(LoadingContext);

    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }

    return {
        ...context,
    }
};

export default useLoading;