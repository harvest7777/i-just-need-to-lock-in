"use client";
import { useState } from "react";
import TimePicker from "./TimePicker";
import TaskPicker from "./TaskPicker";
import { addTaskInterval } from "@/app/(api)/taskTimeServices";
import { getTaskById } from "@/app/(api)/taskServices";
import { useTaskStore } from "../../_hooks/useTaskStore";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const handleVisibleChange = (open: boolean) => {
    setStart(null);
    setEnd(null);
    setSelectedTask(null);
    setError(false);
    setErrorMessage("");
    setVisible(open);
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
    <Dialog open={visible} onOpenChange={handleVisibleChange} modal={false}>
      <DialogTrigger asChild>
        <button className="w-full font-bold text-lg btn-hover outline-1 bg-app-fg outline-app-highlight rounded-xl">
          ✨Add Interval
        </button>
      </DialogTrigger>

      {visible && (
        <div className="fixed inset-0 bg-black/50 z-40 pointer-events-none" />
      )}
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Manually Add An Interval
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center">
          <div className="w-fit flex flex-col gap-y-5">
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

          <div className="w-full text-red-800 text-center italic text-sm">
            {error && errorMessage}
          </div>
          <button
            onClick={() => addInterval()}
            className="mt-8 p-2 text-center rounded-xl font-bold bg-app-highlight w-fit btn-hover"
          >
            Add Interval
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
