import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { backend } from '../App';
import Navbar from './Navbar';
import Footer from './Footer';
import Button from './Widgets/Button';

const PageRedirect = () => {
    const params = useParams();
    const [error, setError] = useState("");

    const fetchURLData = async () => {
        try {
            const res = await axios.get(backend.endpoint + "/v1/url/" + params.short)
            console.log(res.data.url);
            window.location.href = res.data.url;
        } catch (error) {
            if (error.response.status != 500) {
                setError(error.response.data.message)
            } else {
                setError("Internal Server Error.")
            }
        }
    }

    useEffect(() => {
        fetchURLData()
    }, [])
    return (
        <>
            <Navbar />
            <div className="h-80 text-4xl mt-36 text-center">
                {error}
                <div className='text-lg text-bold mt-8'>
                    <Button to="/login" text={"Login"} primary />
                </div>
            </div>
        </>
    )
}

export default PageRedirect