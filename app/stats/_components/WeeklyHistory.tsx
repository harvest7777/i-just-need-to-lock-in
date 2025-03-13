"use client";

import { useEffect, useState } from "react";

import BarGraph from "@/app/lockin/_components/BarGraph";

import { MdArrowForwardIos } from "react-icons/md";

import { getOffsetIntervals } from "@/app/(helpers)/getTimeOffsets";

const WeeklyHistory = () => {
  // get intervals based on some offset
  const [intervals, setIntervals] = useState<Map<number, TaskInterval[]>>();
  const [dayView, setDayView] = useState<number>(0);

  const dayNumberToWord: { [key: number]: String } = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
  };

  const initialize = async () => {
    const day = new Date();
    let dayNumber = day.getDay();

    //traverse offset in circular fashion to cover the whole week regardless of start day
    for (let i = 0; i < 7; i++) {
      const offset = (dayNumber - i) % 7;
      const fetchedIntervals = await getOffsetIntervals(offset);
      setIntervals((prev) => new Map(prev).set(dayNumber - offset, fetchedIntervals));
    }
  }

  useEffect(() => {
    initialize();
  }, [])

  const dayToGraph = (dayNumber: number) => {
    const currentDate = new Date();
    const dayWord: String = dayNumberToWord[dayNumber];
    const offset = currentDate.getDay() - Number(dayNumber);
    currentDate.setDate(currentDate.getDate() - offset);
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const day = currentDate.getDate();
    return (
      <div className="bg-appFg card-outline w-full">
        <div className="w-full flex items-center px-5 py-3">
          <MdArrowForwardIos onClick={() => setDayView(((dayView - 1) + 7) % 7)} className="rotate-180  btn-hover flex-none md:text-5xl text-3xl text-appBg" />
          <h1 className="text-2xl text-center font-bold flex-1">Weekly History</h1>
          <MdArrowForwardIos onClick={() => setDayView((dayView + 1) % 7)} className=" btn-hover flex-none md:text-5xl text-3xl text-appBg" />
        </div>
        <div className="mb-3 mt-1 text-gray-600 w-full">
          <p className="text-xl pl-16 ml-2">{dayWord}, {month} {day} </p>
        </div>
        <BarGraph taskIntervals={intervals?.get(dayNumber) || []} />
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center align-middle select-none">
      {dayToGraph(dayView)}
    </div>
  )
}

export default WeeklyHistory;
