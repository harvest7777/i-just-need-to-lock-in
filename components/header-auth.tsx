"use client";
import { signOutAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/client";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { PiSignOut } from "react-icons/pi";
import { FaLeaf } from "react-icons/fa";
import { MdOutlineAutoGraph } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getNameFromUUID } from "@/app/friends/_services/FetchFriends";
export default function AuthButton() {
  const supabase = createClient();
  const [username, setUsername] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const initialize = async () => {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if(userId) {
      const name = await getNameFromUUID(userId);
      setUsername(name);
    }
  }
  useEffect(()=>{
    initialize();
  },[])
  return username && (
    // Nav container
    <div className="p-2 rounded-2xl h-10 w-full flex items-center gap-4 justify-between mb-3">
      <Link href="/lockin" className="flex space-x-6 btn-hover" >
        <FaLeaf className="text-emerald-600 h-full text-4xl"/>
        <h1 className="text-4xl font-extrabold text-emerald-800">lock in, {username}</h1>
      </Link>
      <div className="md:flex hidden space-x-12 text-3xl">
        <div className="relative group">
          <p className="absolute bottom-full left-1/2 transform -translate-x-1/2 p-1 pb-0 text-sm bg-appBg hidden group-hover:block text-nowrap">stats (coming soon)</p>
          <MdOutlineAutoGraph className="btn-hover tex-3xl"/>
        </div>
        <Link href="/friends" className="relative group">
          <p className="text-nowrap absolute bottom-full left-1/2 transform -translate-x-1/2 p-1 pb-0 text-sm bg-appBg hidden group-hover:block">friends</p>
          <LiaUserFriendsSolid className="btn-hover text-3xl" />
        </Link>
        <Link href="/profile" className="relative group">
          <p className="absolute bottom-full left-1/2 transform -translate-x-1/2 p-1 pb-0 text-sm bg-appBg hidden group-hover:block text-nowrap">settings</p>
          <LuSettings className="btn-hover text-3xl"/>
        </Link>
        <div className="relative group">
          <p className="absolute bottom-full left-1/2 transform -translate-x-1/2 p-1 pb-0 text-sm bg-appBg hidden group-hover:block text-nowrap">sign out</p>
          <PiSignOut className="btn-hover tetx-3xl" onClick={signOutAction}/>
        </div>
      </div>
      <div className="md:hidden inline-block relative">
          <GiHamburgerMenu onClick={()=>setDropdownOpen(!dropdownOpen)} className="btn-hover text-3xl"/>
          {dropdownOpen && 
          <div className="absolute top-10 left-[-35px] w-20 bg-appBg p-2 rounded-xl">
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
    </div>
  );
}
