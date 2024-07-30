import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req) => {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);

        if (isAuthUser) {
            const data = await req.json();
            const { user } = data;

            const saveNewOrder = await Order.create(data);

            if (saveNewOrder) {
                await Cart.deleteMany({ userID: user });

                return NextResponse.json({
                    success: true,
                    message: "Order successfully!",
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to create an order!",
                });
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authticated!",
            });
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again!",
        });
    }
}