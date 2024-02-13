import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { backend } from '../App';
import axios from 'axios';
import Textfield from './Widgets/Textfield';
import Button from './Widgets/Button';
import { DeleteOutlined, FundOutlined, RightCircleOutlined } from '@ant-design/icons';

const Dashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId")
    const [userData, setUserData] = useState({
        name: "",
        email: ""
    })

    const [data, setData] = useState({
        url: "",
        short: ""
    });

    const [urlData, setURLData] = useState();

    const [error, setError] = useState("")


    const getPageData = async () => {
        try {
            const res = await axios.get(backend.endpoint + "/v1/user/" + userId, { headers: { Authorization: `Bearer ${token}` } })
            const url = await axios.get(backend.endpoint + "/v1/url/", { headers: { Authorization: `Bearer ${token}` } });
            setURLData(url.data)
            setUserData({ name: res.data.name, email: res.data.email })
        } catch (error) {
        }
    }

    const validate = (data: any) => {
        const url = data.url.trim();
        const short = data.short.trim();
        const regex: RegExp = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
        const test = regex.test(url);

        if (!url) {
            setError("Please enter the link .")
            return false;
        }
        if (short == "dashboard" || short == "login" || short == "signup" || short == "signin" || short == "register") {
            setError("The link entered is already taken.")
            return false;
        }
        if (!test) {
            setError("The link entered is incorrect.")
            return false;
        }
        if (short && short.length < 5) {
            setError("Short url should be atleast 5 characters.")
            return false;
        }
        return true
    }

    const saveURL = async () => {
        try {
            const valid = validate(data);
            if (valid) {

                const res = await axios.post(backend.endpoint + "/v1/url/add", {
                    ...data
                },
                    { headers: { Authorization: `Bearer ${token}` } })
                setURLData(res.data)
            }
        } catch (error) {
            if (error.response.status != 500) {
                setError(error.response.data.message)
            } else {
                setError("Internal Server Error.")
            }
        }
    }

    const handleChange = (name: string, value: string) => {
        setError("")
        setData((prev) => ({ ...prev, [name]: value }))
    }


    useEffect(() => {
        if (!(token && token.length > 0)) {
            navigate("/login")
        }
        else {
            getPageData()
        }

    }, [])

    return (
        <>
            <div>
                <div className="text-center">
                    <p className='text-3xl py-4 font-bold '>
                        {userData.name && "Hey " + userData.name}
                    </p>
                    <div className='w-96 mx-auto my-8 max-w-xs'>
                        <Textfield placeholder={"Enter a link to shorten"} calue={data.url} name="url" onChange={handleChange} />
                        <div className=' flex items-center'>
                            <Textfield placeholder={"Enter the custom link."} calue={data.short} name="short" onChange={handleChange} />
                            <Button text={"Submit"} primary onClick={saveURL} />
                        </div>
                        <div className='text-red-500 text-xs'>{error}</div>
                    </div>
                    <div className='w-96 mx-auto my-8 text-left max-w-xs'>
                        <p className='text-3xl'>Short URLs</p>
                        {urlData && urlData.map((item: any, index: any) => {
                            return <div className="my-2 text-lg flex items-center" key={index}>
                                <RightCircleOutlined className='mx-1' />
                                <Button text={item.short} className="text-left" />
                            </div>

                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
