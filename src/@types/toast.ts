import React from "react";

export interface IToastState {
    [key: string]: string[],
}

export enum IToastActionKind {
    PUSH = 'PUSH',
    DISMISS = 'DISMISS',
}

enum IToastTypeKind {
    pending = 'pending',
    error = 'error',
    warning = 'warning',
    success = 'success',
}

export interface IToastContext {
    state: IToastState,
    dispatch: React.Dispatch<IToastAction>
}

export interface IToastAction {
    type: IToastActionKind;

    [key: string]: any
}