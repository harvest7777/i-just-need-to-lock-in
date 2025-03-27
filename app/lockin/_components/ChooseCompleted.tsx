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
  timeSpentDisplay: string;
  setTimeSpentDisplay: Dispatch<SetStateAction<string>>;
}
const ChooseCompleted: React.FC<ChooseDisplayInterface> = ({ timeSpentDisplay, setTimeSpentDisplay }) => {
  return (
    <div className="relative z-10 w-full ">
      <DropdownMenu modal={false} >
        <DropdownMenuTrigger className="w-full ring-0 focus:ring-0 focus:outline-hidden">
          <WordBlock text={"time spent " + timeSpentDisplay} className="w-full text-base! justify-between!"><RiArrowDropDownLine /></WordBlock>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[var(--radix-popper-anchor-width)] mt-3 bg-app-fg border-none">
          <DropdownMenuRadioGroup value={timeSpentDisplay} onValueChange={setTimeSpentDisplay}>
            <DropdownMenuRadioItem className="focus:bg-app-highlight" value="total">total</DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="focus:bg-app-highlight" value="today">today</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
export default ChooseCompleted;
