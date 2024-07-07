import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";



export const dynamic = 'force-dynamic';

export const PUT = async (req) => {
    try {
        await connectToDB();
        const extractData = await req.json();

        const {
            id, name, price, description, sizes, deliveryInfo, onSale, priceDrop, imageUrl
        } = extractData;

        const updatedProduct = await Product.findByIdAndUpdate(
            {
                _id: id
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

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again!'
        });
    }
}