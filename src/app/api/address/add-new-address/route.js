import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import Joi from "joi";
import { NextResponse } from "next/server";


const AddNewAddress = Joi.object({
    fullname: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.string().required(),
    userID: Joi.string().required(),
})

export const dynamic = 'force-dynamic';

export const POST = async (req) => {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);

        if (isAuthUser) {

            const data = await req.json();

            const { fullname, address, city, country, postalCode, userID } = data;

            const { error } = AddNewAddress.validate({ fullname, address, city, country, postalCode, userID });

            if (error) {
                return NextResponse({
                    success: false,
                    message: error.details[0].message
                });
            }

            const newlyAddedAddress = await Address.create(data);

            if (newlyAddedAddress) {
                return NextResponse({
                    success: true,
                    message: 'Address added successfully!'
                });
            } else {
                return NextResponse({
                    success: false,
                    message: 'Failed to add an address!'
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