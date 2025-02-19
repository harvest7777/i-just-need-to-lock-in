import { signOutAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";

import { PiSignOut } from "react-icons/pi";
import { MdLock } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { FaHome } from "react-icons/fa";

import Dropdown from "./ui/dropdown";
import Link from "next/link";

export default async function AuthButton() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user&& (
    // Nav container
    <div className="p-2 my-2 mb-3 rounded-2xl h-10 w-full flex items-center gap-4 justify-between ">
      <Link href="/lockin" className="flex sm:space-x-6 space-x-2 btn-hover" >
        <FaHome className="text-emerald-600 h-full sm:text-4xl text-2xl"/>
        <div className="flex align-center items-baseline space-x-3">
          <h1 className="sm:text-4xl text-2xl font-extrabold text-emerald-800">LOCK IN</h1>
          <p className="text-emerald-800">beta 1.0</p>
        </div>
      </Link>
      <div className="md:flex hidden space-x-12 text-3xl">
        <Link href="/lockin" className="relative group">
          {/* <p className="absolute bottom-full left-1/2 transform -translate-x-1/2 p-1 pb-0 text-sm bg-appBg hidden group-hover:block text-nowrap">stats</p>
          <MdOutlineAutoGraph className="btn-hover tex-3xl"/> */}
          <p className="text-lg btn-hover font-bold">home</p>
        </Link>
        <Link href="/stats" className="relative group">
          {/* <p className="absolute bottom-full left-1/2 transform -translate-x-1/2 p-1 pb-0 text-sm bg-appBg hidden group-hover:block text-nowrap">stats</p>
          <MdOutlineAutoGraph className="btn-hover tex-3xl"/> */}
          <p className="text-lg btn-hover font-bold">stats ✨</p>
        </Link>
        <Link href="/friends" className="relative group text-l">
          {/* <p className="text-nowrap absolute bottom-full left-1/2 transform -translate-x-1/2 p-1 pb-0 text-sm bg-appBg hidden group-hover:block">friends</p> */}
          {/* <LiaUserFriendsSolid className="btn-hover text-3xl" /> */}
          <p className="text-lg btn-hover font-bold">feed</p>
        </Link>
        <Link href="/profile" className="relative">
          <LuSettings className="btn-hover text-3xl"/>
        </Link>
        <div className="relative">
          <PiSignOut className="btn-hover tetx-3xl" onClick={signOutAction}/>
        </div>
      </div>
      <Dropdown/>
    </div>
  );
}
