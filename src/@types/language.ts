import React from "react";


export type DirectionType = Direction

export enum Direction {
    RTL = "rtl",
    LTR = "ltr"
}

export interface ILanguageContext {
    languageApp: string,
    setLanguageApp: React.Dispatch<React.SetStateAction<string>>,
    directionApp: DirectionType,
    languageIsReady: boolean,
    setLanguageIsReady: React.Dispatch<React.SetStateAction<boolean>>,
    languageList: {
        key: string;
        dir: DirectionType;
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