"use client";

import { LuSettings } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { RiTrophyLine } from "react-icons/ri";
import { IoIosStats } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";

import Dropdown from "./ui/dropdown";
import Link from "next/link";
import EnterPomodoroButton from "@/app/lockin/_components/EnterPomodoroButton";
import { useTaskStore } from "@/app/lockin/_hooks/useTaskStore";
import { usePathname } from "next/navigation";

export default function AuthButton() {
  const pomodoroEnabled = useTaskStore((state) => state.pomodoroEnabled)
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/lockin");
  return (
    // Nav container
    <div className="p-2 my-2 mb-3 rounded-2xl h-10 w-full flex items-center gap-4 justify-between ">
      <Link href="/lockin" className="flex sm:space-x-3 space-x-2 btn-hover" >
        <FaHome className="text-app-highlight h-full sm:text-4xl text-2xl" />
        <div className="flex align-center items-baseline space-x-3">
          <h1 className="sm:text-4xl text-2xl font-extrabold text-app-highlight">LOCK IN</h1>
          {/* <p className="text-emerald-800">beta 1.0</p> */}
        </div>
      </Link>
      <div className={`flex md:gap-x-10 gap-x-2 ${pomodoroEnabled && '!gap-x-0'}`}>
        {isDashboard && <EnterPomodoroButton />}
        <div className="md:flex hidden gap-x-10 text-3xl">
          {/* <Link href="/lockin" className={`relative ${pomodoroEnabled && 'hidden'}`}> */}
          {/*   <p className="text-lg btn-hover font-bold">home</p> */}
          {/* </Link> */}
          <Link href="/leaderboard" className={`relative ${pomodoroEnabled && 'hidden'}`}>
            <RiTrophyLine className="btn-hover text-3xl" />
          </Link>
          <Link href="/stats" className={`relative ${pomodoroEnabled && 'hidden'}`}>
            <IoIosStats className="btn-hover text-3xl" />
          </Link>
          <Link href="/friends" className={`relative ${pomodoroEnabled && 'hidden'}`}>
            <FaUserFriends className="btn-hover text-3xl" />
          </Link>
          <Link href="/profile" className={`relative flex gap-x-2 ${pomodoroEnabled && 'hidden'}`}>
            <LuSettings className="btn-hover text-3xl" />
          </Link>
        </div>
        <Dropdown />
      </div>
    </div>
  );
}
