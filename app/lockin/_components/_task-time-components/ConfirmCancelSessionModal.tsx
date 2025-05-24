import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { getTimeDisplayFromSeconds } from "@/app/(helpers)/getTimeDisplay";
import { cancelLastStart } from "@/app/(api)/taskTimeServices";
import { broadcastUpdatedTask } from "@/app/(api)/realtimeServices";
import { useTaskStore } from "../../_hooks/useTaskStore";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function StillWorkingModal() {
  const {
    focusedTask,
    setFocusedTask,
    toDos,
    setToDos,
    setStartedFocusedTask,
  } = useTaskStore();
  const [open, setOpen] = useState(false);
  const [timeSpent, setTimeSpent] = useState<string>("0 min");

  // when a task has been in progress for a very long time, make sure the user is actually still working
  useEffect(() => {
    // calculate seconds spent on task this session
    const lastStartTimeString = focusedTask?.last_start_time;
    const nowUTC = new Date();
    let lastStartTimeUTC = new Date();
    if (lastStartTimeString) lastStartTimeUTC = new Date(lastStartTimeString);

    const secondsThisSession = Math.floor(
      (nowUTC.getTime() - lastStartTimeUTC.getTime()) / 1000
    );
    setTimeSpent(getTimeDisplayFromSeconds(secondsThisSession));
  }, [focusedTask]);

  const handleCancelSession = () => {
    setStartedFocusedTask(false);
    cancelLastStart(focusedTask);
    let updatedTask = focusedTask;
    if (updatedTask) {
      updatedTask.last_start_time = null;
      broadcastUpdatedTask(updatedTask);
      let updatedToDos = toDos!.map((t) =>
        t.task_id === updatedTask.task_id ? { ...t, ...updatedTask } : t
      );
      setToDos(updatedToDos);
    }
    setFocusedTask(null);
    setOpen(false);
  };

  if (!focusedTask) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-fit px-2 rounded-xl btn-hover h-8 md:text-2xl text-xl bg-red-700 hover:text-app-fg">
          cancel
        </button>
      </DialogTrigger>
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Confirm Cancel Session
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center">
          <div>
            <span>You've been working on </span>
            <span className=" px-2 bg-app-bg rounded-xl">
              {focusedTask.name}
            </span>
            <span> for </span>
            <span className="px-2 bg-app-bg rounded-xl">{timeSpent}</span>
            <span> without stopping!</span>
          </div>

          <div className="mt-3">
            <span>
              Would you like to cancel this sesssion to avoid logging{" "}
            </span>
            <span className="px-2 bg-app-bg rounded-xl">{timeSpent}</span>
            <span> to your graph and total time?</span>
          </div>
          <button
            onClick={() => handleCancelSession()}
            className="mt-3 p-2 text-center  bg-red-800 rounded-xl font-bold w-fit btn-hover"
          >
            Cancel Session
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
