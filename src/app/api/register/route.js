import connectToDB from "@/database"
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
    name: Joi.string.required(),
    email: Joi.string.required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required()
});

export const dynamic = 'force-dynamic';

export const POST = async (req) => {
    await connectToDB();

    //validate the schema
    const { name, email, password, role } = await req.json();

    const { error } = schema.validate({ name, email, password, role });

    if (error) {
        return NextResponse.json({
            success: false,
            message: email.details[0]
        });
    }

    try {
        //check if the user is exist or not
        const isUserAlreadyExists = await User.findOne({ email });

        if (isUserAlreadyExists) {
            return NextResponse.json({
                success: false,
                message: 'User with this email already exists!'
            });
        } else {
            //hash the password with bcrypt
            const hashPassword = await hash(password, 12);

            //create user in db
            const newlyCreatedUser = await User.create({
                name, email, password: hashPassword, role
            });

            if (newlyCreatedUser) {
                return NextResponse.json({
                    success: true,
                    message: 'User created successfully!'
                });
            }
        }
    } catch (error) {
        console.log('Error in new user registration')

        return NextResponse.json({
            success: false,
            message: 'Something whent wrong! Please try again later!'
        });
    }

}