"use client";

import {
  updateLogin,
  getStreak,
  getLastLogin,
} from "@/app/(api)/profileServices";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsFire } from "react-icons/bs";

export default function Streak() {
  const [streak, setStreak] = useState<number>(0);

  const streakToast = () => toast.success("Daily checkin complete!");

  const init = async () => {
    const lastLogin: Date | null = await getLastLogin();
    const today = new Date();

    if (
      !lastLogin ||
      Math.floor(
        (today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24)
      ) > 1
    ) {
      streakToast();
    }
    await updateLogin();
    const fetchedStreak: number = await getStreak();
    setStreak(fetchedStreak);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="relative text-orange-400">
      <Toaster />
      <BsFire className=" relative btn-hover text-3xl" />
      <p className="absolute text-sm font-bold bottom-[-2px] right-[-7px]">
        {streak}
      </p>
    </div>
  );
}
