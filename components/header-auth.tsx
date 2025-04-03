import { createClient } from "@/utils/supabase/server";

import { LuSettings } from "react-icons/lu";
import { FaHome } from "react-icons/fa";

import Dropdown from "./ui/dropdown";
import Link from "next/link";
import EnterPomodoroButton from "@/app/lockin/_components/EnterPomodoroButton";

export default async function AuthButton() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user && (
    // Nav container
    <div className="p-2 my-2 mb-3 rounded-2xl h-10 w-full flex items-center gap-4 justify-between ">
      <Link href="/lockin" className="flex sm:space-x-3 space-x-2 btn-hover" >
        <FaHome className="text-app-highlight h-full sm:text-4xl text-2xl" />
        <div className="flex align-center items-baseline space-x-3">
          <h1 className="sm:text-4xl text-2xl font-extrabold text-app-highlight">LOCK IN</h1>
          {/* <p className="text-emerald-800">beta 1.0</p> */}
        </div>
      </Link>
      <EnterPomodoroButton />
      <div className="md:flex hidden space-x-10 text-3xl">
        <Link href="/lockin" className="relative group">
          <p className="text-lg btn-hover font-bold">home</p>
        </Link>
        <Link href="/leaderboard" className="relative group">
          <p className="text-lg btn-hover font-bold">leaderboard</p>
        </Link>
        <Link href="/stats" className="relative group">
          <p className="text-lg btn-hover font-bold">stats</p>
        </Link>
        <Link href="/friends" className="relative group text-l">
          <p className="text-lg btn-hover font-bold">feed</p>
        </Link>
        <Link href="/profile" className="relative flex">
          <LuSettings className="btn-hover text-3xl" />
          <p className="text-xl">✨</p>
        </Link>
      </div>
      <Dropdown />
    </div>
  );
}
