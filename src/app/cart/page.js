'use client'

import CommonCart from "@/components/CommonCart";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

const Cart = () => {

    const { user, setCartItems, cartItems, pageLevelLoader, setPageLevelLoader, setComponentLevelLoader, componentLevelLoader } = useContext(GlobalContext);

    const extractAllCartItems = async () => {

        setPageLevelLoader(true);

        const res = await getAllCartItems(user?._id);

        if (res.success) {
            setPageLevelLoader(false);
            const updatedData =
                res.data && res.data.length
                    ? res.data.map((item) => ({
                        ...item,
                        productID: {
                            ...item.productID,
                            price:
                                item.productID.onSale === "yes"
                                    ? parseInt(
                                        (
                                            item.productID.price -
                                            item.productID.price * (item.productID.priceDrop / 100)
                                        ).toFixed(2)
                                    )
                                    : item.productID.price,
                        },
                    }))
                    : [];
            setCartItems(updatedData);
            localStorage.setItem("cartItems", JSON.stringify(updatedData));
        }

        console.log(res);
    }

    useEffect(() => {
        if (user !== null) {
            extractAllCartItems();
        }
    }, [user]);

    const handleDeleteCartItem = async (getCartItemID) => {
        setComponentLevelLoader({ loading: true, id: getCartItemID });

        const res = await deleteFromCart(getCartItemID);

        if (res.success) {
            setComponentLevelLoader({ loading: false, id: "" });
            toast.success(res.message, {
                position: 'top-right',
            });

            extractAllCartItems();

        } else {
            toast.error(res.message, {
                position: 'top-right',
            });

            setComponentLevelLoader({ loading: false, id: getCartItemID });
        }
    }

    if (pageLevelLoader) {
        return <div className="w-full min-h-screen flex justify-center items-center">
            <PulseLoader
                color={'#000000'}
                loading={pageLevelLoader}
                size={30}
                data-testid="loader"
            />
        </div>
    }

    return (
        <CommonCart componentLevelLoader={componentLevelLoader} handleDeleteCartItem={handleDeleteCartItem} cartItems={cartItems} />
    )
}

export default Cart