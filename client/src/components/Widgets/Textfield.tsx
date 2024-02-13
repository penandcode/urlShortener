import React from 'react'

const Textfield = (props: any) => {
    return (
        <div className='m-1 w-full'>
            <input
                name={props.name}
                type={props.type ? props.type : "text"}
                className="border rounded py-4 px-4 bg-blue-50 h-12 w-full"
                placeholder={props.placeholder}
                onChange={((e: any) => props.onChange(e.target.name, e.target.value))}
            />
        </div>
    )
}

export default Textfield