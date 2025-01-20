"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState} from "react";
import Link from "next/link";
import { signOutAction } from "@/app/actions";
export default function Dropdown() {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const closeDropdown = () => {setDropdownOpen(false)};
    return (
      <div className="md:hidden inline-block relative z-40">
          <GiHamburgerMenu onClick={()=>setDropdownOpen(!dropdownOpen)} className="btn-hover text-3xl"/>
          {dropdownOpen && 
          <div className="z-30 absolute top-10 left-[-35px] w-20 bg-appBg p-2 rounded-xl">
            <Link href="/friends" onClick={closeDropdown} className="btn-hover">
              <p>friends</p>
            </Link>
            <Link href="/profile" onClick={closeDropdown} className="btn-hover">
              <p>settings</p>
            </Link>
            <div onClick={()=>{signOutAction(); closeDropdown()}} className="btn-hover">
              <p>sign out</p>
            </div>
          </div>} 
      </div>

    )
}