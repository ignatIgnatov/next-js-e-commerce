import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";



export const dynamic = 'force-dynamic';

export const GET = async (req) => {
    try {
        await connectToDB();

        const isAuthUser = await AuthUser();

        if (isAuthUser) {

            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');

            if (!id) {
                return NextResponse({
                    success: false,
                    message: 'Cart item ID is required!'
                });
            }

            const extractAllCartItems = await Cart
                .find({ userID: id }
                    .populate('userID')
                    .populate('productID'));

            if (extractAllCartItems) {
                return NextResponse({
                    success: true,
                    data: extractAllCartItems
                });
            } else {
                return NextResponse({
                    success: false,
                    status: 240,
                    message: 'No cart items are found!'
                });
            }

        } else {
            return NextResponse({
                success: false,
                message: 'You are not authenticated!'
            })
        }
    } catch (error) {
        console.log(error);
        return NextResponse({
            success: false,
            message: 'Something went wrong! Please try again!'
        });
    }
}