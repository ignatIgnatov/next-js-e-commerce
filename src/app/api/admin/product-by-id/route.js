import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';

export const GET = async (req) => {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get('id');

        console.log(productId);
        if (!productId) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: 'Product ID is required!'
            });
        }

        const getData = await Product.find({ _id: productId });

        if (getData && getData.length) {
            return NextResponse.json({
                success: true,
                data: getData[0]
            })
        } else {
            return NextResponse({
                success: false,
                status: 204,
                message: 'No product found!'
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