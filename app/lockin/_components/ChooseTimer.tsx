"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { RiArrowDropDownLine } from "react-icons/ri"; 

interface ChooseDisplayInterface {
    timerDisplay: string;
    setTimerDisplay: Dispatch<SetStateAction<string>>;
}
const ChooseDisplay:React.FC<ChooseDisplayInterface> = ({timerDisplay,setTimerDisplay})=> {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleShowToday = () => {
        setIsOpen(false);
        setTimerDisplay("today");
    }
    const handleShowTotal = () => {
        setIsOpen(false);
        setTimerDisplay("total");
    }

    const handleShowSession = () => {
        setIsOpen(false);
        setTimerDisplay("session");
    }
    return (
        <div className="relative z-10">
        <div onClick={()=>setIsOpen(!isOpen)} className="pl-2 md:text-2xl text-xl rounded-xl bg-appBg flex flex-row items-center justify-center align-middle cursor-pointer gap-x-2">
            {timerDisplay}
            <RiArrowDropDownLine
            className={`transition-transform duration-200 ${ isOpen ? "rotate-180" : "rotate-0"}`}/>
        </div>
        {isOpen && (
            <div className="absolute top-10 left-0 bg-appBg rounded-xl border-4 border-appFg px-2 py-1 w-36 divide-y divide-gray-700 cursor-default">
                <p onClick={handleShowSession}>session ✨</p>
                <p onClick={handleShowToday}>today</p>
                <p onClick={handleShowTotal}>total</p>
            </div>
        )}
        </div>
    )
}
export default ChooseDisplay;