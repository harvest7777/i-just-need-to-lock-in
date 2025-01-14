"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState} from "react";
import Link from "next/link";
import { signOutAction } from "@/app/actions";
export default function Dropdown() {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    return (
      <div className="md:hidden inline-block relative">
          <GiHamburgerMenu onClick={()=>setDropdownOpen(!dropdownOpen)} className="btn-hover text-3xl"/>
          {dropdownOpen && 
          <div className="z-30 absolute top-10 left-[-35px] w-20 bg-appBg p-2 rounded-xl">
            <Link href="/friends" className="btn-hover">
              <p>friends</p>
            </Link>
            <Link href="/settings" className="btn-hover">
              <p>settings</p>
            </Link>
            <div onClick={signOutAction} className="btn-hover">
              <p>sign out</p>
            </div>
          </div>} 
      </div>

    )
}