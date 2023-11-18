import {useContext} from "react";
import {LanguageContext} from "../contexts/language";
import useUser from "./useUser";

const useLanguage = () => {
    const {isAuth, changeUserLanguage} = useUser();
    const {
        languageApp,
        setLanguageApp,
        languageIsReady,
        setLanguageIsReady,
        languageList,
    } = useContext(LanguageContext);

    const changeLanguage = (lang) => {
        if (lang === languageApp) return;

        setLanguageIsReady(false);
        setLanguageApp(lang);
        if (isAuth) {
            changeUserLanguage(lang);
        }
    };

    return {languageApp, changeLanguage, languageIsReady, languageList};
};

export default useLanguage;