import React from "react";

interface HeaderCardProps {
    title: string;
    className?: string;
}
const HeaderCard:React.FC<HeaderCardProps> = ({title, className}) => {
    return (
        <>
        <h1 className={`text-center text-emerald-600 font-bold text-3xl mt-5 bg-appFg p-2 px-4 card-outline ${className}`}>{title}</h1>
        </>
    )
}
export default HeaderCard;