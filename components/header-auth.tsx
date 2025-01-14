import { signOutAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { PiSignOut } from "react-icons/pi";
import { FaLeaf } from "react-icons/fa";
import { MdOutlineAutoGraph } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import Dropdown from "./ui/dropdown";
import Link from "next/link";
export default async function AuthButton() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user&& (
    // Nav container
    <div className="p-2 rounded-2xl h-10 w-full flex items-center gap-4 justify-between mb-3">
      <Link href="/lockin" className="flex space-x-6 btn-hover" >
        <FaLeaf className="text-emerald-600 h-full text-4xl"/>
        <div className="flex align-center items-baseline space-x-3">
          <h1 className="sm:text-4xl text-2xl font-extrabold text-emerald-800">lock in</h1>
          <p className="text-emerald-800">beta 1.0</p>
        </div>
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
      <Dropdown/>
    </div>
  );
}
