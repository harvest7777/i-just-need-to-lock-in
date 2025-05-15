"use client";

import { useEffect, useState } from "react";

import BarGraph from "./BarGraph";
import { MdArrowForwardIos } from "react-icons/md";

import { getOffsetIntervals } from "@/app/(helpers)/getTimeOffsets";
import { getPastTaskTime } from "@/app/(api)/taskTimeServices";
import { getUserId } from "@/app/(api)/profileServices";
import { TPastTaskTime } from "@/app/(api)/taskTimeServices";
import { secondsToHoursMins } from "@/app/(helpers)/formatTime";
import DisplayTimeSpent from "./DisplayTimeSpent";

import PreLoaderSmall from "@/app/_components/PreLoaderSmall";

const WeeklyHistory = () => {
  // get intervals based on some offset
  const [intervals, setIntervals] = useState<Map<number, TaskInterval[]>>();
  const [pastTimes, setPastTimes] = useState<Map<number, TPastTaskTime[]>>();
  const [dayView, setDayView] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const dayNumberToWord: { [key: number]: String } = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  const initialize = async () => {
    await iniitalizePastIntervals();
    await initializePastTasks();
    setLoading(false);
  };

  const iniitalizePastIntervals = async () => {
    const day = new Date();
    let dayNumber = day.getDay();

    //traverse offset in circular fashion to cover the whole week regardless of start day
    for (let i = 0; i <= dayNumber; i++) {
      const offset = dayNumber - i;
      const fetchedIntervals = await getOffsetIntervals(offset);
      setIntervals((prev) => new Map(prev).set(i, fetchedIntervals));
    }
  };
  const initializePastTasks = async () => {
    const day = new Date();
    let dayNumber = day.getDay();
    const userId = await getUserId();
    for (let i = 0; i <= dayNumber; i++) {
      const daysBack: number = dayNumber - i;
      const fetchedPastTime: TPastTaskTime[] = await getPastTaskTime(
        daysBack,
        userId
      );
      setPastTimes((prev) => new Map(prev).set(i, fetchedPastTime));
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  if (loading) {
    return (
      <div className="bg-app-fg card-outline">
        <PreLoaderSmall />
      </div>
    );
  }
  const dayToGraph = (dayNumber: number) => {
    const currentDate = new Date();
    const dayWord: String = dayNumberToWord[dayNumber];
    const offset = currentDate.getDay() - Number(dayNumber);
    currentDate.setDate(currentDate.getDate() - offset);
    const month = currentDate.toLocaleString("default", { month: "long" });
    const day = currentDate.getDate();
    return (
      <div className="w-full">
        <div className="mb-3 mt-1 text-app-text w-full">
          <p className="text-xl pl-16 ml-2">
            {dayWord}, {month} {day}{" "}
          </p>
        </div>
        <BarGraph taskIntervals={intervals?.get(dayNumber) || []} />
      </div>
    );
  };

  const dayToPastTimes = (dayNumber: number) => {
    const tasks = pastTimes?.get(dayNumber);
    const currentDate = new Date();
    const day = currentDate.getDay();

    if (!pastTimes || !tasks || tasks.length === 0) {
      return (
        <p className="text-center mt-3 pb-3">
          {dayNumber >= day
            ? "No session data yet"
            : `Didn't lock in on ${dayNumberToWord[dayNumber]}`}
        </p>
      );
    }
    return <DisplayTimeSpent tasks={tasks} />;
  };
  return (
    <div className="flex flex-col justify-center items-center align-middle select-none bg-app-fg card-outline pb-2">
      <div className="w-full flex items-center px-5 py-3">
        <MdArrowForwardIos
          onClick={() => setDayView((dayView - 1 + 7) % 7)}
          className="rotate-180  btn-hover flex-none md:text-5xl text-3xl text-app-bg"
        />
        <h1 className="text-2xl text-center font-bold flex-1">
          Weekly History
        </h1>
        <MdArrowForwardIos
          onClick={() => setDayView((dayView + 1) % 7)}
          className=" btn-hover flex-none md:text-5xl text-3xl text-app-bg"
        />
      </div>
      {dayToGraph(dayView)}
      {dayToPastTimes(dayView)}
    </div>
  );
};

export default WeeklyHistory;
