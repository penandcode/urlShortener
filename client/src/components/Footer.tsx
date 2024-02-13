import React from 'react'
import Button from './Widgets/Button';

const FooterSection = (props) => {
    return (
        <section className='flex flex-col w-48'>
            <p className='font-bold'>{props.name}</p>
            {props?.values?.map((item: any, index: number) => (
                <Button key={index} className='text-left' height={"auto"} width={"auto"} text={item} />
            ))}
        </section>
    )
}
const Footer = () => {

    const footerArr = [
        { name: "Company", values: ["About Us", "Jobs", "Career"] },
        { name: "Pricing", values: ["Free", "Pro", "Custom"] },
        { name: "More", values: ["Privacy Policy", "Terms"] },
    ]

    return (
        <footer className="bg-gray-800 text-white pt-4 w-full" >
            <div className='px-3 py-5'>
                <section className='flex justify-between flex-wrap text-left'>
                    {footerArr.map((item, index) => {
                        return <FooterSection key={index} name={item.name} values={item.values} />
                    })}
                </section>
            </div>
            <p className='text-center py-3'>&copy; 2023 Short. All rights reserved.</p>
        </footer>
    )
};
export default Footer