import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { connect } from "mongoose";
import { NextResponse } from "next/server";



export const dynamic = 'force-dynamic';

export const DELETE = async (req) => {
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

            const deletedCartItem = Cart.findByIdAndDelete(id);

            if (deletedCartItem) {
                return NextResponse({
                    success: true,
                    message: 'Cart item deleted successfully!'
                });
            } else {
                return NextResponse({
                    success: false,
                    message: 'Failed to delete cart item!'
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
        });
    }
}