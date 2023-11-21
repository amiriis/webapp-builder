import React, {createContext, useReducer} from "react";
import {toast, ToastContainer} from "react-toastify";
import {IToastAction, IToastActionKind, IToastContext, IToastState} from "../../@types/toast";
import {useDirection} from "../../hooks";

const initialState: IToastState = {
    pending: [],
    error: [],
    warning: [],
    success: []
}
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

export const ToastContext = createContext<IToastContext | undefined>(undefined)

export const ToastProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {directionApp} = useDirection()
    
    return (
        <ToastContext.Provider value={{state, dispatch}}>
            <ToastContainer
                enableMultiContainer
                containerId="validation"
                position={directionApp === "ltr" ? "top-left" : "top-right"}
                rtl={directionApp === 'rtl'}/>
            <ToastContainer
                enableMultiContainer
                containerId={'connection'}
                position={directionApp === "ltr" ? "top-right" : "top-left"}
                rtl={directionApp === 'rtl'}/>
            {children}
        </ToastContext.Provider>
    );
};