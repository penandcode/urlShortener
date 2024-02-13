import React from 'react'
import hero from "../assets/hero.jpg"
import { UserOutlined, LinkOutlined, JavaScriptOutlined } from "@ant-design/icons"
import Navbar from './Navbar'
import Footer from './Footer'
import Button from './Widgets/Button'
const LandingCard = (props) => {
    return (
        <>
            <div className='h-80 w-80 rounded-xl border-blue-800 bg-blue-300 flex justify-center items-center m-2'>
                <div className='text-center m-2'>
                    {props.children}
                    <p className='font-extrabold text-3xl mt-3 text-gray-100'>{props.text}</p>
                </div>
            </div>
        </>
    )
}
const Home = () => {

    return (
        <>
            <Navbar />
            <div className="h-[66vh]">
                <img className='absolute h-[66vh] bg-cover bg-no-repeat bg-center w-screen rounded-b-2xl' src={hero} alt="hero-image" />
                <div className='absolute z-10 text-gray-50 top-1/4 p-3'>
                    <p className='font-extrabold text-5xl'>Shorten, share and track your links.</p>
                    <p className='text-sm pt-2'>Get started for free. No credit card required.</p>
                    <div className='mt-2 text-center pt-8'>
                        <Button primary text={"Let's Start"} />
                    </div>
                </div>
            </div>
            <div className='h-auto'>
                <p className="font-bold text-3xl text-center pt-3 mb-10">Insights</p>
                <div className='flex justify-center flex-wrap mb-10'>
                    <LandingCard text={"100+ users"}>
                        <UserOutlined className="text-6xl" />
                    </LandingCard>
                    <LandingCard text={"1000+ links"}>
                        <LinkOutlined className="text-6xl" />
                    </LandingCard>
                    <LandingCard text={"Power of JS"}>
                        <JavaScriptOutlined className="text-6xl" />
                    </LandingCard>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home