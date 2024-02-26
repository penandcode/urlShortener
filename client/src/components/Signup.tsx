import React, { useState } from 'react';
import axios from "axios";
import Navbar from './Navbar'
import Footer from './Footer'
import Button from './Widgets/Button'
import Textfield from './Widgets/Textfield'
import { backend } from '../App'

const Signup = () => {


    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState("")

    const handleChange = async (name: string, value: string) => {
        setError("")
        setData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        try {
            const valid = validateData(data);

            if (valid) {
                console.log("apple");

                const res = await axios.post(backend.endpoint + "/v1/auth/signup", data);

            }
        } catch (error) {
            console.log(error);
            
            if (error.response.status == 400) {
                setError(error.response.data.message)
            } else {
                setError("Internal Server Error.")
            }
        }
    }

    const validateData = (data: { name: string, email: string, password: string, confirmPassword: string }) => {
        const name = data.name.trim()
        const email = data.email.trim();
        const password = data.password.trim();
        const confirmPassword = data.confirmPassword.trim();
        if (!name || !email || !password || !confirmPassword) {
            setError("Please enter all the fields.")
            return false;
        }
        if (password.length < 8) {
            setError("Password should be atleast 8 characters.")
            return false;
        }
        if (password.length < 8) {
            setError("Password can be max 54 characters.")
            return false;
        }
        if (password != confirmPassword) {
            setError("Passwords should be same.")
            return false;
        }
        return true
    }

    return (
        <div>
            <Navbar />
            <div>
                <p className='text-5xl text-center h-auto my-8'>Signup</p>
                <section className='text-center'>
                    <div className='m-2 flex flex-col items-center'>
                        <div className='w-full max-w-[350px]'>
                            <Textfield placeholder="Please enter Name." name="name" onChange={handleChange} />
                        </div>
                        <div className='w-full max-w-[350px]'>
                            <Textfield placeholder="Please enter Email." name="email" onChange={handleChange} />
                        </div>
                        <div className='w-full max-w-[350px]'>
                            <Textfield placeholder="Please enter Password." name="password" onChange={handleChange} />
                        </div>
                        <div className='w-full max-w-[350px]'>
                            <Textfield placeholder="Please Confirm Password." name="confirmPassword" onChange={handleChange} />
                        </div>
                    </div>
                    <div className='text-red-500 text-xs'>{error}</div>
                    <div className='py-5'>
                        <Button text={"Signup"} primary onClick={handleSubmit} />
                    </div>
                    <div>
                        <p>Already have an account?<Button width={"w-12"} className="font-bold" to="/login" text={"Login"} /></p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Signup