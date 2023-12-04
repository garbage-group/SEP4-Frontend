import { useEffect } from "react";

export function LocalStorage({ state, setState }) {
    return useEffect(() => {
        const stored = localStorage.getItem(state);
        if (stored === true) {
            setState(true);
        }
    }, [state, setState])
}