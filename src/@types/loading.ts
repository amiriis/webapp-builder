import React from "react";

export interface ILoadingContext {
    loadingPage: boolean;
    setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>;
}