"use client";
import { useState } from "react";
import TimePicker from "./TimePicker";
import TaskPicker from "./TaskPicker";
import WordBlock from "@/components/ui/word-block";

export default function AddInterval() {
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div>
      <button
        onClick={() => setVisible(true)}
        className="w-full font-bold text-lg btn-hover outline-1 bg-app-fg outline-app-highlight rounded-xl"
      >
        Add Interval
      </button>

      {visible && (
        <div className="fixed top-0 left-0 w-full min-h-full flex justify-center md:items-start items-center z-50">
          {/* background */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <div className="md:w-1/2 w-11/12 p-5 rounded-xl bg-app-fg flex flex-col items-center align-middle mt-32 justify-center gap-y-5 z-50">
            <h1 className="text-center text-2xl font-bold">
              Manually Add An Interval
            </h1>
            <div className="w-fit flex flex-col gap-y-5">
              <TaskPicker setSelectedTask={setSelectedTask} />
              <div className="flex gap-x-2">
                <p className="w-12">Start</p>
                <TimePicker selectedDate={start} setSelectedDate={setStart} />
              </div>
              <div className="flex gap-x-2">
                <p className="w-12">End</p>
                <TimePicker selectedDate={end} setSelectedDate={setEnd} />
              </div>
            </div>

            <div className="flex gap-x-2 flex-wrap text-lg gap-y-2">
              <span>I certify I worked on</span>
              <span className="px-2 bg-app-bg rounded-xl">
                {selectedTask ? selectedTask.name : ""}
              </span>
              <span>from</span>

              <span className="px-2 bg-app-bg rounded-xl">
                {start
                  ? start.toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : ""}
              </span>
              <span>to </span>

              <span className="px-2 bg-app-bg rounded-xl">
                {end
                  ? end.toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : ""}
              </span>
            </div>
            <div className="flex justify-center items-center align-middle space-x-8 mt-3">
              <button
                onClick={() => setVisible(false)}
                className="p-2 text-center rounded-xl font-bold bg-app-highlight w-fit btn-hover"
              >
                Add Interval
              </button>
              <button
                onClick={() => setVisible(false)}
                className=" p-2 text-center  rounded-xl font-bold bg-neutral-400 w-fit btn-hover"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
