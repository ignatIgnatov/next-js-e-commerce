import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextResponse } from "next/server";


const AddToCart = Joi.object({
    userID: Joi.string().required(),
    productID: Joi.string().required()
})


export const dynamic = 'force-dynamic';

export const POST = async (req) => {
    try {

        await connectToDB();
        const isAuthUser = AuthUser(req);

        if (isAuthUser) {

            const data = await req.json();
            const { productID, userID } = data;

            const { error } = AddToCart.validate({ userID, productID });

            if (error) {
                return NextResponse({
                    success: false,
                    message: error.details[0].message
                });
            }

            const isCurrentCartItemAlreadyExists = await Cart.find({
                productID: productID,
                userID: userID
            });

            if (isCurrentCartItemAlreadyExists) {
                return NextResponse({
                    success: false,
                    message: 'Product is already added to cart!'
                });
            }

            const saveProductToCart = await Cart.create(data);

            if (saveProductToCart) {
                return NextResponse({
                    success: true,
                    message: 'Product is added to cart successfully!'
                });
            } else {
                return NextResponse({
                    success: false,
                    message: 'Failed to add the product!'
                });
            }

        } else {
            return NextResponse({
                success: false,
                message: 'You are not authenticated!'
            });
        }

    } catch (error) {
        console.log(error);
        return NextResponse({
            success: false,
            message: 'Something went wrong! Please try again!'
        })
    }
}