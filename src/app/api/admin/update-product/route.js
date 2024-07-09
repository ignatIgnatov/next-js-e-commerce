import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";



export const dynamic = 'force-dynamic';

export const PUT = async (req) => {
    try {
        await connectToDB();

        const isAuthUser = AuthUser(req);

        if (isAuthUser?.admin === 'admin') {

            const extractData = await req.json();

            const {
                _id, name, price, description, sizes, deliveryInfo, onSale, priceDrop, imageUrl
            } = extractData;

            const updatedProduct = await Product.findByIdAndUpdate(
                {
                    _id: _id
                },
                {
                    name, price, description, sizes, deliveryInfo, onSale, priceDrop, imageUrl
                },
                { new: true }
            );

            if (updatedProduct) {
                return NextResponse.json({
                    success: true,
                    message: 'Product updated successfully!'
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'Failed to update the product!'
                });
            }
        } else {
            return NextResponse.json({
                success: false,
                message: 'You are not authenticated!'
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again!'
        });
    }
}