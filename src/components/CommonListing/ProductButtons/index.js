'use client'

import ComponentLevelLoader from "@/components/Loader/componentLevelLoader";
import { GlobalContext } from "@/app/context";

import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

const ProductButtons = ({ item }) => {
    const pathName = usePathname();
    const {
        setCurrentUpdatedProduct,
        setComponentLevelLoader,
        componentLevelLoader,
        user,
        showCartModal, setShowCartModal
    } = useContext(GlobalContext);
    const router = useRouter();

    const isAdminView = pathName.includes("admin-view");

    // async function handleDeleteProduct(item) {
    //     setComponentLevelLoader({ loading: true, id: item._id });

    //     const res = await deleteAProduct(item._id);

    //     if (res.success) {
    //         setComponentLevelLoader({ loading: false, id: "" });
    //         toast.success(res.message, {
    //             position: toast.POSITION.TOP_RIGHT,
    //         });
    //         router.refresh();
    //     } else {
    //         toast.error(res.message, {
    //             position: toast.POSITION.TOP_RIGHT,
    //         });
    //         setComponentLevelLoader({ loading: false, id: "" });
    //     }
    // }

    // async function handleAddToCart(getItem) {
    //     setComponentLevelLoader({ loading: true, id: getItem._id });

    //     const res = await addToCart({ productID: getItem._id, userID: user._id });

    //     if (res.success) {
    //         toast.success(res.message, {
    //             position: toast.POSITION.TOP_RIGHT,
    //         });
    //         setComponentLevelLoader({ loading: false, id: "" });
    //         setShowCartModal(true);
    //     } else {
    //         toast.error(res.message, {
    //             position: toast.POSITION.TOP_RIGHT,
    //         });
    //         setComponentLevelLoader({ loading: false, id: "" });
    //         setShowCartModal(true)
    //     }

    //     console.log(res);
    // }

    return isAdminView ? (
        <>
            <button

                className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            >
                Update
            </button>
            <button

                className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            >
                {componentLevelLoader &&
                    componentLevelLoader.loading &&
                    item._id === componentLevelLoader.id ? (
                    <ComponentLevelLoader
                        text={"Deleting Product"}
                        color={"#ffffff"}
                        loading={componentLevelLoader && componentLevelLoader.loading}
                    />
                ) : (
                    "DELETE"
                )}
            </button>
        </>
    ) : (
        <>
            <button

                className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            >
                {componentLevelLoader &&
                    componentLevelLoader.loading &&
                    componentLevelLoader.id === item._id ? (
                    <ComponentLevelLoader
                        text={"Adding to cart"}
                        color={"#ffffff"}
                        loading={componentLevelLoader && componentLevelLoader.loading}
                    />
                ) : (
                    "Add To Cart"
                )}
            </button>
        </>
    );
}

export default ProductButtons