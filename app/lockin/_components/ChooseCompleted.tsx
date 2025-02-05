"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { RiArrowDropDownLine } from "react-icons/ri"; 
interface ChooseDisplayInterface {
    timeSpentDisplay: string;
    setTimeSpentDisplay: Dispatch<SetStateAction<string>>;
}
const ChooseCompleted:React.FC<ChooseDisplayInterface> = ({timeSpentDisplay,setTimeSpentDisplay})=> {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleShowToday = () => {
        setIsOpen(false);
        setTimeSpentDisplay("today");
    }
    const handleShowTotal = () => {
        setIsOpen(false);
        setTimeSpentDisplay("total");
    }

    return (
        <div className="relative w-full">
        <div onClick={()=>setIsOpen(!isOpen)} className="px-2 rounded-lg bg-appBg flex justify-between items-center align-middle cursor-pointer gap-x-2">
            time spent {timeSpentDisplay}
            <RiArrowDropDownLine
            className={`transition-transform duration-200 ${ isOpen ? "rotate-180" : "rotate-0"}`}/>
        </div>
        {isOpen && (
            <div className="absolute top-8 left-0 bg-appBg z-10 rounded-lg border-4 border-appFg px-2 w-full divide-y divide-gray-700 cursor-default">
                <p onClick={handleShowToday}>today</p>
                <p onClick={handleShowTotal}>total</p>
            </div>
        )}
        </div>
    )
}
export default ChooseCompleted;