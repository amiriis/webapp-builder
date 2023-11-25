import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import stylisRTLPlugin from "stylis-plugin-rtl";

const isBrowser = typeof document !== "undefined";

export const createEmotionCacheLtr = () => {
    let insertionPoint: HTMLElement | undefined;

    if (isBrowser) {
        const emotionInsertionPoint = document.querySelector(
            'meta[name="emotion-insertion-point"]'
        );
        insertionPoint = emotionInsertionPoint as HTMLElement | undefined;
    }

    return createCache({
        key: "mui-style",
        insertionPoint,
    });
};

export const createEmotionCacheRtl = () => {
    let insertionPoint: HTMLElement | undefined;

    if (isBrowser) {
        const emotionInsertionPoint = document.querySelector(
            'meta[name="emotion-insertion-point"]'
        );
        insertionPoint = emotionInsertionPoint as HTMLElement | undefined;
    }

    return createCache({
        key: "mui-rtl",
        stylisPlugins: [prefixer, stylisRTLPlugin],
        insertionPoint,
    });
};
