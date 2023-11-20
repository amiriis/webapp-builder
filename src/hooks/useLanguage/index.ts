import {useContext} from "react";
import useUser from "../useUser";
import {ILanguageContext} from "../../@types/language";
import {LanguageContext} from "../../contexts";

interface IUseLanguage extends ILanguageContext {
    changeLanguage: (lang: string) => void,
}

const useLanguage = (): IUseLanguage => {
    const {isAuth, changeUserLanguage} = useUser();
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }

    const changeLanguage = (lang: string) => {
        if (lang == context.languageApp) return;

        context.setLanguageIsReady(false);
        context.setLanguageApp(lang);
        if (isAuth) {
            changeUserLanguage(lang);
        }
    };

    return {...context, changeLanguage};
};

export default useLanguage;