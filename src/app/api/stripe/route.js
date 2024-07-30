import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

const stripeSk = process.env.NEXT_STRIPE_SK;
const stripe = require("stripe")(stripeSk);

export const dynamic = "force-dynamic";

export const POST = async (req) => {
    try {
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const res = await req.json();

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: res,
                mode: "payment",
                success_url: "http://localhost:3000/checkout" + "?status=success",
                cancel_url: "http://localhost:3000/checkout" + "?status=cancel",
            });

            return NextResponse.json({
                success: true,
                id: session.id,
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authenticated!",
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 500,
            success: false,
            message: "Something went wrong! Please try again!",
        });
    }
}