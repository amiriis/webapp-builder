import {useContext} from 'react';
import {ToastContext} from "../contexts/toast";

const useToast = () => {
    const {dispatch} = useContext(ToastContext);

    const pushToastList = (toast_type, toast_id) => {
        dispatch({type: "PUSH", toast_type, toast_id});
    };

    const dismissToastList = (toast_type) => {
        dispatch({type: "DISMISS", toast_type});
    };

    return {
        pushToastList,
        dismissToastList
    }
};

export default useToast;