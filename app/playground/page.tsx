"use client";
import { useState } from "react"

import WordBlock from "@/components/ui/word-block";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Playground() {
  const [position, setPosition] = useState("session")
  return (
    <div className="flex flex-col items-center justify-center align-middle w-full h-screen bg-appFg ">
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger >
          <WordBlock text="asdf"></WordBlock>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-3">
          <DropdownMenuLabel>Timer Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="session">session</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="today">today</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="total">total</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}