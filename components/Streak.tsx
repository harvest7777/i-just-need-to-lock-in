"use client";

import {
  updateLogin,
  getStreak,
  getLastLogin,
} from "@/app/(api)/profileServices";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { BsFire } from "react-icons/bs";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function Streak() {
  const [streak, setStreak] = useState<number>(0);

  const streakToast = () => toast.success("Daily checkin complete!");
  const toastFiredRef = useRef<boolean>(false);

  const init = async () => {
    const lastLogin: Date | null = await getLastLogin();
    const today = new Date();

    if (
      !lastLogin ||
      Math.floor(
        (today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24)
      ) > 1
    ) {
      if (!toastFiredRef.current) {
        setTimeout(() => {
          streakToast();
        }, 1000);
        toastFiredRef.current = true;
      }
    }

    await updateLogin();
    const fetchedStreak: number = await getStreak();
    setStreak(fetchedStreak);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <HoverCard openDelay={500}>
      <HoverCardTrigger>
        <div className="relative text-orange-400">
          <BsFire className=" relative btn-hover text-3xl" />
          <div className="rounded-full absolute text-sm font-bold bottom-[-2px] right-[-1px] bg-app-bg h-4 w-3 flex items-center justify-center align-middle">
            <p>{streak}</p>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm">
          Keep up the good work! You've checked in {streak}{" "}
          {streak > 1 ? "day" : "days"} in a row!
        </p>
      </HoverCardContent>
    </HoverCard>
  );
}
