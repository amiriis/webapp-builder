import React from "react";

export interface ILanguageContext {
    languageApp: string,
    setLanguageApp: React.Dispatch<React.SetStateAction<string>>,
    directionApp: string,
    languageIsReady: boolean,
    setLanguageIsReady: React.Dispatch<React.SetStateAction<boolean>>,
    languageList: {
        key: string;
        dir: string;
        name: string;
        fontFamily: string;
        tableLocalization: any;
        chartLocalization: any;
    }[]
}

export interface ILanguageDefaultValues {
    [key: string]: {
        datatable: any,
        chart: any
    }
}