import {useRouter} from "next/router";
import React, {useEffect} from "react";
import {useUser} from "../../hooks";
import {WithoutAuthComponent} from "../../components";

export const WithoutAuthMiddleware: React.FC<React.PropsWithChildren<{ defaultUrl: string }>> = ({
                                                                                                     children,
                                                                                                     defaultUrl
                                                                                                 }) => {
    const {isAuth} = useUser();
    const router = useRouter();

    const backUrlDecodedPath = router.query?.back_url as string;

    useEffect(() => {
        if (!isAuth) return;
        const timer = setTimeout(() => {
            router.replace(
                backUrlDecodedPath
                    ? decodeURIComponent(backUrlDecodedPath)
                    : defaultUrl
            );
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, [isAuth]);

    return isAuth ? (
        <WithoutAuthComponent backUrlDecodedPath={backUrlDecodedPath}/>
    ) : (
        <>{children}</>
    );
};