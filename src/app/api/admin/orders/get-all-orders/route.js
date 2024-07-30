import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req) => {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);

        if (isAuthUser?.role === "admin") {
            //find all orders from all users
            const getAllOrders = await Order.find({})
                .populate("orderItems.product")
                .populate("user");

            if (getAllOrders) {
                return NextResponse.json({
                    success: true,
                    data: getAllOrders,
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message:
                        "Failed to fetch the orders!",
                });
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not autorized!",
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again!",
        });
    }
}