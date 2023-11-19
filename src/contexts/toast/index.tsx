import React, {createContext, useReducer} from "react";
import {toast} from "react-toastify";
import {IToastAction, IToastActionKind, IToastContext, IToastState} from "../../@types/toast";

export const ToastContext = createContext<IToastContext | undefined>(undefined)

const reducer = (state: IToastState, action: IToastAction) => {
    switch (action.type) {
        case IToastActionKind.PUSH:
            return {
                ...state,
                [action.toast_type]: [...state[action.toast_type], action.toast_id]
            };
        case IToastActionKind.DISMISS:
            for (const item of action.toast_type) {
                state[item].map((id) => {
                    toast.dismiss(id);
                })
                state[item] = []
            }
            return state;
    }
};

const initialState: IToastState = {
    pending: [],
    error: [],
    warning: [],
    success: []
}

export const ToastProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ToastContext.Provider value={{state, dispatch}}>
            {children}
        </ToastContext.Provider>
    );
};