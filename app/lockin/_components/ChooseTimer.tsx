"use client";

import { Dispatch, SetStateAction } from "react";
import { RiArrowDropDownLine } from "react-icons/ri"; 

import WordBlock from "@/components/ui/word-block";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ChooseDisplayInterface {
    timerDisplay: string;
    setTimerDisplay: Dispatch<SetStateAction<string>>;
}
const ChooseDisplay:React.FC<ChooseDisplayInterface> = ({timerDisplay,setTimerDisplay})=> {
    return (
        <div className="relative z-10 ">
            <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="ring-0 focus:ring-0 focus:outline-none">
                <WordBlock className="!justify-between" text={timerDisplay}><RiArrowDropDownLine/></WordBlock>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-popper-anchor-width)] mt-3 bg-appFg">
                <DropdownMenuRadioGroup value={timerDisplay} onValueChange={setTimerDisplay}>
                <DropdownMenuRadioItem value="session">session</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="today">today</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="total">total</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
export default ChooseDisplay;