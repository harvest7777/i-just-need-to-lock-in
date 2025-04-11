"use client";

import { useState, useEffect } from "react";

import CompletedTasks from "./CompletedTasks";
import IncompleteTasks from "./IncompleteTasks";
import LockedInTask from "./LockedInTask";
import NewTaskForm from "./NewTaskForm";
import Stopwatch from "./TotalStopwatch";
import BarGraph from "./BarGraph";
import FriendsList from "@/app/friends/_components/FriendsList";
import StillWorkingModal from "./ConfirmCancelSessionModal";
import DailyStopwatch from "./DailyStopwatch";
import ChooseDisplay from "./ChooseTimer";
import SessionStopWatch from "./SessionStopwatch";
import PreLoader from "./PreLoader";
import NewGroupButton from "./NewGroupButton";
import PomodoroTimeDisplay from "./PomodoroTimeDisplay";
import BreakTimer from "./BreakTimer";
import { desyncDetected } from "@/app/(api)/taskServices";
import { initializeTaskStore } from "@/app/(helpers)/taskStoreInit";
import { useTaskStore } from "../_hooks/useTaskStore";


export default function Dashboard() {
  const focusedTask = useTaskStore((state) => state.focusedTask);
  const taskIntervals = useTaskStore((state) => state.taskIntervals);
  const pomodoroEnabled = useTaskStore((state) => state.pomodoroEnabled);
  const breakMode = useTaskStore((state) => state.breakMode);
  const startedFocusedTask = useTaskStore((state) => state.startedFocusedTask);
  const setCompletedTasks = useTaskStore((state) => state.setCompletedTasks);
  const setTaskIntervals = useTaskStore((state => state.setTaskIntervals));
  const [timerDisplay, setTimerDisplay] = useState<string>("session");
  const [cancelVisible, setCancelVisible] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
  }
  const handleVisibilityChange = async () => {
    if (document.visibilityState === "visible" && await desyncDetected()) {
      console.log("desync detected")
    }
  }

  useEffect(() => {
    if (startedFocusedTask) window.addEventListener('beforeunload', handleBeforeUnload);
    else window.removeEventListener('beforeunload', handleBeforeUnload)

    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [startedFocusedTask])

  // lazy load confetti
  useEffect(() => {
    setHydrated(true);
    initializeTaskStore();
    // interval to check if the clock reads 12 am
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours(); // Get the hour (0-23)
      const minutes = now.getMinutes(); // Get the minutes (0-59)

      // if 12 am (next day), reset the states of everything unless the user was
      // working on something
      if (hours === 0 && minutes === 0) {
        console.log("CLEARING");
        setTaskIntervals([]);
        setCompletedTasks([]);

        clearInterval(interval);
      }
    }, 1000); // Check every second

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => { document.removeEventListener('visibilitychange', handleVisibilityChange) };

  }, [])

  if (!hydrated) {
    return (
      <PreLoader />
    )
  }
  return (
    <>
      {cancelVisible && <StillWorkingModal setCancelVisible={setCancelVisible} />}
      <div className="flex md:flex-row md:gap-x-2 flex-col md:space-y-0 space-y-3">
        {/* graph and changelog container */}
        <div className="md:order-2 order-1 md:w-3/5 w-full flex flex-col">
          <div className="w-full flex flex-col bg-app-fg card-outline justify-center items-center p-3 h-fit">
            {/* locked in task and graph */}
            {focusedTask && !breakMode ? (
              <>
                <div className="w-full space-y-5 p-5 rounded-2xl h-min">
                  <LockedInTask />
                  {!pomodoroEnabled && (

                    <div className="flex justify-center items-center align-middle space-x-2">
                      <ChooseDisplay timerDisplay={timerDisplay} setTimerDisplay={setTimerDisplay} />
                      {timerDisplay == "today" && (
                        <DailyStopwatch setCancelVisible={setCancelVisible} />
                      )}
                      {timerDisplay == "total" && (
                        <Stopwatch setCancelVisible={setCancelVisible} />
                      )}
                      {timerDisplay == "session" && (
                        <SessionStopWatch setCancelVisible={setCancelVisible} />
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              !breakMode &&
              <p className="text-center lg:text-2xl text-xl w-full mb-2 py-5">{pomodoroEnabled ? "You're in pomodoro mode, pick a task to start working!" : "Click the ⭐ next to any task to lock in!"}</p>
            )}
            {pomodoroEnabled && (

              <div className="w-full space-y-5 pb-5 rounded-2xl h-min">
                <div className="flex justify-center">
                  <div className={breakMode ? "hidden" : "w-full"}>
                    <PomodoroTimeDisplay />
                  </div>
                  <div className={breakMode ? "w-full" : "hidden"}>
                    <BreakTimer />
                  </div>
                </div>
              </div>
            )}
            <div className="w-full">
              <BarGraph taskIntervals={taskIntervals} />
            </div>
          </div>
        </div>
        {/* container for task lists */}
        <div className="md:order-1 order-2 flex flex-col md:w-1/5 w-full space-y-3">
          <div className="bg-app-fg card-outline">
            <div className="flex justify-between w-full p-2 pb-0">
              <h1 className="font-bold text-xl pl-2 flex-1">To Do</h1>
              <NewGroupButton />
            </div>
            <IncompleteTasks />
            <NewTaskForm />
          </div>
          <div className="bg-app-fg card-outline">
            <CompletedTasks />
          </div>
        </div>
        {/* container for friends */}
        <div className="flex flex-col md:w-1/5 order-3 w-full space-y-3">
          <div className="bg-app-fg card-outline">
            <FriendsList />
          </div>
        </div>

      </div>
    </>
  )
}
