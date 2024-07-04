'use client'

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import { registerNewUser } from "@/services/register";
import { registrationFormControls } from "@/utils";
import Link from "next/link";
import { useState } from "react";

const isRegistred = false;

const initialFormData = {
    name: '',
    email: '',
    password: '',
    role: 'customer'
}

const Register = () => {

    const [formData, setFormData] = useState(initialFormData);

    const isFormValid = () => {
        return formData && formData.name && formData.name.trim() !== ''
            && formData.email && formData.email.trim() !== ''
            && formData.password && formData.password.trim() !== ''
            ? true : false
    }

    const handleRegisterOnSubmit = async () => {
        //call the service file for register user
        const data = await registerNewUser(formData);
    }

    return (
        <div className="bg-white relative">
            <div className="flex flec-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg: flex-row">
                <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                    <div className="w-full mt-10 mr-0 mb-0 ml-8 relative max-w-2xl lg:mt-0 lg:w-5/12">
                        <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                            <p className="w-full text-4xl font-medium text-center font-serif">
                                {
                                    isRegistred ? 'Registration Successfull' : 'Sign up'
                                }
                            </p>
                            {
                                isRegistred ?
                                    <button className="mt-6 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium upercase tracking-wide">Login</button>
                                    :
                                    <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                        {
                                            registrationFormControls.map((controlItem) =>
                                                controlItem.componentType === 'input' ?
                                                    <InputComponent
                                                        type={controlItem.type}
                                                        placeholder={controlItem.placeholder}
                                                        label={controlItem.label}
                                                        onChange={(event) => {
                                                            setFormData({
                                                                ...formData,
                                                                [controlItem.id]: event.target.value
                                                            })
                                                        }}
                                                        value={formData[controlItem.id]}
                                                    />
                                                    :
                                                    controlItem.componentType === 'select' ?
                                                        <SelectComponent
                                                            options={controlItem.options}
                                                            label={controlItem.label}
                                                            onChange={(event) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    [controlItem.id]: event.target.value
                                                                })
                                                            }}
                                                            value={formData[controlItem.id]}
                                                        />
                                                        : null
                                            )
                                        }
                                        <button
                                            className="disabled:opacity-50 mt-6 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium upercase tracking-wide"
                                            disabled={!isFormValid()}
                                            onClick={handleRegisterOnSubmit}
                                        >
                                            Sign up
                                        </button>
                                        <div className="flex justify-center items-center">
                                            <p>You have an account yet? <Link href={'/login'} className="font-bold">Login here!</Link></p>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register