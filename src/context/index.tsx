// context to be use to manage the state globally, for the future
"use client";
import { createContext, useState, useContext } from "react";

const AppContext = createContext("");

export function Wrapper ({children} : {
    children: React.ReactNode;
}) {
    let [state, setState] = useState("");
    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}