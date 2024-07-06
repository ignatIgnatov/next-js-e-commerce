'use client'

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {

    const [showNavModel, setShowNavModel] = useState(false);
    const [isAuthUser, setIsAuthUser] = useState(null);
    const [user, setUser] = useState(null);
    const [pageLevelLoader, setPageLevelLoader] = useState(false);
    const [componentLevelLoader, setComponentLevelLoader] = useState({
        loading: false,
        id: "",
    });

    useEffect(() => {
        if (Cookies.get('token') !== undefined) {
            setIsAuthUser(true);
            const userData = JSON.parse(localStorage.getItem('user')) || {};
            setUser(userData);
        } else {
            setIsAuthUser(false);
        }
    }, [Cookies])

    return (
        <GlobalContext.Provider value={{
            showNavModel,
            setShowNavModel,
            isAuthUser,
            setIsAuthUser,
            user, setUser,
            pageLevelLoader,
            setPageLevelLoader,
            componentLevelLoader,
            setComponentLevelLoader
        }}>{children}</GlobalContext.Provider>
    )
}

export default GlobalState;