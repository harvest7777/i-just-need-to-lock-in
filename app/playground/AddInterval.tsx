"use client";
import { useState } from "react";
import TimePicker from "./TimePicker";
import TaskPicker from "./TaskPicker";

export default function AddInterval() {
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  return (
    <div className="w-full bg-app-fg flex flex-col items-center align-middle justify-center gap-y-5">
      <h1 className="font-bold text-center text-xl">Manually Log Interval</h1>
      <div className="flex gap-x-2">
        <p className="w-12">Start</p>
        <TimePicker selectedDate={start} setSelectedDate={setStart} />
      </div>

      <div className="flex gap-x-2">
        <p className="w-12">End</p>
        <TimePicker selectedDate={end} setSelectedDate={setEnd} />
      </div>
      <TaskPicker />
    </div>
  );
}
