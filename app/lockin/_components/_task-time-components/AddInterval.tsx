"use client";
import { useState } from "react";
import TimePicker from "./TimePicker";
import TaskPicker from "./TaskPicker";
import { addTaskInterval } from "@/app/(api)/taskTimeServices";
import { getTaskById } from "@/app/(api)/taskServices";
import { useTaskStore } from "../../_hooks/useTaskStore";

export default function AddInterval() {
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const updateTask = useTaskStore((state) => state.updateTask);
  const insertTaskInterval = useTaskStore((state) => state.addTaskInterval);

  const calculateDifference = (date1: Date, date2: Date): string => {
    const diffMs = Math.abs(date2.getTime() - date1.getTime()); // difference in milliseconds
    const totalMinutes = Math.floor(diffMs / 60000); // convert ms to minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };
  const addInterval = async () => {
    //convert time to utc
    if (!start || !end || !selectedTask) {
      setError(true);
      setErrorMessage("Need a start time, end time, and task!");
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 5000);
      return;
    }

    if (start > end) {
      setError(true);
      setErrorMessage("End time must be after start time!");
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 5000);
      return;
    }

    const taskInterval = await addTaskInterval(
      selectedTask.task_id,
      start,
      end
    );

    const updatedTask = await getTaskById(selectedTask.task_id);
    updateTask(updatedTask);
    insertTaskInterval(taskInterval);
    setVisible(false);
  };

  return (
    <div className="text-xl">
      <button
        onClick={() => setVisible(true)}
        className="w-full font-bold text-lg btn-hover outline-1 bg-app-fg outline-app-highlight rounded-xl"
      >
        ✨Add Interval
      </button>

      {visible && (
        <div className="fixed top-0 left-0 w-full min-h-full flex justify-center  items-center z-50">
          {/* background */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <div className="md:w-1/2 w-11/12 p-5 rounded-xl bg-app-fg flex flex-col items-center align-middle justify-center z-50">
            <h1 className="text-center text-2xl font-bold">
              Manually Add An Interval
            </h1>
            <div className="w-fit flex flex-col gap-y-5 mt-5">
              <TaskPicker setSelectedTask={setSelectedTask} />
              <div className="flex gap-x-2 items-center">
                <p className="w-12">Start</p>
                <TimePicker selectedDate={start} setSelectedDate={setStart} />
              </div>
              <div className="flex items-center gap-x-2">
                <p className="w-12">End</p>
                <TimePicker selectedDate={end} setSelectedDate={setEnd} />
              </div>
            </div>

            <div className="flex gap-x-2 flex-wrap gap-y-2 mt-5">
              <span>I certify I worked on</span>
              <span className="px-2 bg-app-bg rounded-xl">
                {selectedTask ? selectedTask.name : "[task]"}
              </span>
              <span>from</span>

              <span className="px-2 bg-app-bg rounded-xl">
                {start
                  ? start.toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "[start]"}
              </span>
              <span>to </span>

              <span className="px-2 bg-app-bg rounded-xl">
                {end
                  ? end.toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "[end]"}
              </span>
              <span>for</span>
              <span className="px-2 bg-app-bg rounded-xl">
                {!start || !end ? "[time]" : calculateDifference(start, end)}
              </span>
            </div>
            <div className="min-h-5 w-full text-red-800 text-center italic text-sm">
              {errorMessage}
            </div>
            <div className="flex justify-center items-center align-middle space-x-8 mt-3/">
              <button
                onClick={() => addInterval()}
                className="p-2 text-center rounded-xl font-bold bg-app-highlight w-fit btn-hover"
              >
                Add Interval
              </button>
              <button
                onClick={() => setVisible(false)}
                className=" p-2 text-center  rounded-xl font-bold bg-app-bg w-fit btn-hover"
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
