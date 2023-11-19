import React, {createContext, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import useUser from "../hooks/useUser";

export const LanguageContext = createContext();

export const LanguageProvider = ({children, defaultLocalization}) => {
    const router = useRouter();
    const languageList = [
        {
            key: "fa",
            dir: "rtl",
            name: "فارسی",
            fontFamily: `IRANSansFaNum, sans-serif`,
            tableLocalization: defaultLocalization['fa'].datatable,
            chartLocalization: defaultLocalization['fa'].chart
        }
    ];
    const {user, userChangedLanguage, changeLanguageState} = useUser();
    const [languageIsReady, setLanguageIsReady] = useState(false);
    const [languageApp, setLanguageApp] = useState(process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE);
    const [directionApp, setDirectionApp] = useState(
        process.env.NEXT_PUBLIC_DEFAULT_DIRECTION
    );

    useEffect(() => {
        const lang = localStorage.getItem("_language");

        if (lang) {
            setLanguageApp(lang);
        }
    }, []);

    useEffect(() => {
        if (!languageApp) return;

        const lang = localStorage.getItem("_language");

        if (!lang) {
            localStorage.setItem("_language", languageApp);
        } else {
            if (languageApp !== lang) {
                localStorage.setItem("_language", languageApp);
            }
        }
    }, [languageApp]);

    useEffect(() => {
        if (!router.isReady) return;
        if (user.user_language) {
            if (user.user_language !== languageApp) {
                setLanguageApp(user.user_language);
                return;
            }
        }

        if (languageApp !== router.locale) {
            router.replace(
                {pathname: router.pathname, query: router.query},
                router.asPath,
                {
                    locale: languageApp,
                }
            );
            return;
        }
        for (const lang of languageList) {
            if (languageApp !== lang.key) continue;
            setDirectionApp(lang.dir);
            document.dir = lang.dir;
        }

        const timer = setTimeout(() => {
            changeLanguageState(false);
            setLanguageIsReady(true);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [router.locale, router.isReady, userChangedLanguage, languageApp]);

    return (
        <LanguageContext.Provider
            value={{
                languageApp,
                setLanguageApp,
                directionApp,
                languageIsReady,
                setLanguageIsReady,
                languageList,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};