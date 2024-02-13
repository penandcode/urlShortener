import React from 'react'
import Button from './Widgets/Button'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="h-16 z-[9999] bg-blue-300">
            <div className='flex pl-2 items-center justify-between h-full'>
                <button className='font-extrabold text-3xl'>
                    <Link to={"/"}>Short</Link>
                </button>
                <div className='flex flex-row'>
                    <Button width={"w-20"} className="font-bold" to="/signup" text={"Signup"} />
                    <Button width={"w-20"} className="font-bold text-gray-200" to="/login" text={"Login"} />
                </div>
            </div>
        </div>
    )
}

export default Navbar