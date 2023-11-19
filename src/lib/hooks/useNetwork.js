import {useEffect, useState} from 'react';

function useNetwork() {
    const [state, setState] = useState(() => {
        return {
            online: navigator.onLine,
        };
    });
    useEffect(() => {
        const handleOnline = () => {
            setState((prevState) => ({
                ...prevState,
                online: true,
            }));
        };
        const handleOffline = () => {
            setState((prevState) => ({
                ...prevState,
                online: false,
            }));
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return state;
}

export default useNetwork;