import {useContext} from "react";
import {UserContext} from "../../contexts";
import {IUserContext} from "../../@types/user";

interface IUseUser extends IUserContext {

}

export const useUser = (): IUseUser => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return {...context};
};