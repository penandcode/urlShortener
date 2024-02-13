import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Button from './Widgets/Button'
import Textfield from './Widgets/Textfield'
import axios from 'axios'
import { backend } from '../App'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState("")

    const handleChange = async (name: string, value: string) => {
        setError("")
        setData((prev) => ({ ...prev, [name]: value }))
    }

    const saveToken = (data: any) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
    }

    const handleSubmit = async () => {
        try {
            const valid = validateData(data);

            if (valid) {
                const res = await axios.post(backend.endpoint + "/v1/auth/login", data);

                saveToken({ token: res.data.token, userId: res.data.user._id })
                navigate("/dashboard")


            }
        } catch (error) {
            if (error.response.status != 500) {
                setError(error.response.data.message)
            } else {
                setError("Internal Server Error.")
            }
        }
    }

    const validateData = (data: { email: string, password: string }) => {
        const email = data.email.trim();
        const password = data.password.trim();
        if (!email || !password) {
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
        return true
    }



    return (
        <div>
            <Navbar />
            <div>
                <p className='text-5xl text-center h-auto my-8'>Login</p>
                <section className='text-center'>
                    <div className='m-2 flex flex-col items-center'>
                        <div className='w-full max-w-[350px]'>
                            <Textfield type="email" placeholder="Please enter Email." name="email" onChange={handleChange} />
                        </div>
                        <div className='w-full max-w-[350px]'>
                            <Textfield type="password" placeholder="Please enter Password." name="password" onChange={handleChange} />
                        </div>
                    </div>
                    <div className='text-red-500 text-xs'>{error}</div>
                    <div className='py-5'>
                        <Button text={"Login"} primary onClick={handleSubmit} />
                    </div>
                    <div>
                        <p>Already have an account?<Button width={"w-12"} className="font-bold" to="/signup" text={"Signup"} /></p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Login