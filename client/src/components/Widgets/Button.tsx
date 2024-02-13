import React from 'react'
import { Link } from 'react-router-dom'

const Button = (props: any) => {
    return (
        <button onClick={props.onClick} className={`${props.primary ? "bg-blue-500 text-gray-50" : ""} ${props.secondary ? "bg-gray-50" : ""
            } ${props.height ? props.height : "h-12"} ${props.width ? props.width : "w-40"} rounded-lg border-gray-50 ${props.className && props.className}`}>
            {props.to ? <Link to={props.to}>{props.text}</Link> : <>{props.text}</>}
        </button>
    )
}

export default Button