'use client'

import { GlobalContext } from '@/app/context';
import ComponentLevelLoader from '../Loader/componentLevelLoader';
import { Fragment, useContext } from 'react';
import { useRouter } from 'next/navigation';
import CommonModel from '../CommonModel';


const CartModal = () => {

    const {
        showCartModal,
        setShowCartModal,
        cartItems,
        setCartItems,
        user,
        setComponentLevelLoader,
        componentLevelLoader,
    } = useContext(GlobalContext);

    const router = useRouter();




    return (
        <div></div>
    )
}

export default CartModal