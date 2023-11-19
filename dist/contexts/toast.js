import React, { createContext, useReducer } from 'react';
import { toast } from "react-toastify";
export const ToastContext = /*#__PURE__*/createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "PUSH":
      return {
        ...state,
        [action.toast_type]: [...state[action.toast_type], action.toast_id]
      };
    case "DISMISS":
      action.toast_type.map(item => {
        state[item].map(id => {
          toast.dismiss(id);
        });
        state[item] = [];
      });
      return state;
  }
};
export const ToastProvider = ({
  children
}) => {
  const [state, dispatch] = useReducer(reducer, {
    pending: [],
    error: [],
    warning: [],
    success: []
  });
  return /*#__PURE__*/React.createElement(ToastContext.Provider, {
    value: {
      state,
      dispatch
    }
  }, children);
};