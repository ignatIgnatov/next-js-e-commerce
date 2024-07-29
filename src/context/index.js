'use client'

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export const initialCheckoutFormData = {
    shippingAddress: {},
    paymentMethod: "",
    totalPrice: 0,
    isPaid: false,
    paidAt: new Date(),
    isProcessing: true,
};

const GlobalState = ({ children }) => {

    const [showNavModel, setShowNavModel] = useState(false);
    const [isAuthUser, setIsAuthUser] = useState(null);
    const [user, setUser] = useState(null);
    const [pageLevelLoader, setPageLevelLoader] = useState(true);
    const [componentLevelLoader, setComponentLevelLoader] = useState({
        loading: false,
        id: "",
    });
    const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
    const [showCartModal, setShowCartModal] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [addressFormData, setAddressFormData] = useState({
        fullName: '',
        city: '',
        country: '',
        postalCode: '',
        address: ''
    });

    const [checkoutFormData, setCheckoutFormData] = useState(
        initialCheckoutFormData
    );

    useEffect(() => {
        if (Cookies.get('token') !== undefined) {
            setIsAuthUser(true);
            const userData = JSON.parse(localStorage.getItem('user')) || {};
            const getCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            setUser(userData);
            setCartItems(getCartItems);
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
            setComponentLevelLoader,
            currentUpdatedProduct,
            setCurrentUpdatedProduct,
            showCartModal, setShowCartModal,
            cartItems, setCartItems,
            addresses, setAddresses,
            addressFormData, setAddressFormData,
            checkoutFormData, setCheckoutFormData,
        }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalState;