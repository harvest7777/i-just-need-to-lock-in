import { useForm } from "react-hook-form";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTaskStore } from "../_hooks/useTaskStore";

interface EnterPomodoroModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

interface TimeFormInput {
  minutesWork: number;
  minutesBreak: number;
  notificationsEnabled: boolean;
}

export default function EnterPomodoroModal({ setShowModal }: EnterPomodoroModalProps) {
  const { handleSubmit, register, reset, setError, formState: { errors } } = useForm<TimeFormInput>();
  const setEnabled = useTaskStore((state) => state.setPomodoroEnabled);

  const onSubmit = async (data: TimeFormInput) => {
    let pomodoroGoalMs: number = Number(data.minutesWork * 60 * 1000);
    let pomodoroBreak: number = Number(data.minutesBreak * 60 * 1000);
    pomodoroGoalMs = 10000;
    pomodoroBreak = 10000;

    console.log(data.notificationsEnabled)
    if (data.notificationsEnabled) {
      localStorage.setItem("notifications", "yes");
      const result = await Notification.requestPermission();
      if (result === "denied") {
        setError("notificationsEnabled", {
          type: "manual",
          message: "We weren't able to enable notifications. Perhaps you are in incognito mode or your browser has notifications disabled?",
        });
        return;
      }
    } else {
      localStorage.setItem("notifications", "no");
    }
    localStorage.setItem("pomodoroGoalMs", String(pomodoroGoalMs));
    localStorage.setItem("breakTimeMs", String(pomodoroBreak));
    localStorage.removeItem("lastPauseTime");
    localStorage.removeItem("totalPauseTimeMs");
    reset();
    setEnabled(true);
    setShowModal(false);
  }
  return (
    <div className="fixed top-0 left-0 w-full min-h-full flex justify-center md:items-start items-center z-50">
      {/* Background Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      {/* Modal Content */}
      <div className="relative md:w-3/5 w-11/12 bg-app-fg p-3 rounded-xl h-fit md:mt-28 text-xl flex flex-col justify-center items-center">
        <h1 className="text-center text-2xl font-bold">Customize Your Pomodoro</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-x-2 mt-5">
          <div className="w-full flex justify-center gap-x-2 ">
            <label>Work Time:</label>
            <input
              className="bg-app-bg w-18 rounded-lg px-2"
              defaultValue={25}
              type="number"
              {...register("minutesWork", {
                required: "Cmon you gotta work at least a little bit...",
                min: { value: 5, message: "Must be at least 5 minutes" },
                max: { value: 60, message: "Must be at most 60 minutes" },
              })} />
            <span>minutes</span>
          </div>
          {errors.minutesWork && <p className="text-red-800 text-sm text-center">{errors.minutesWork.message}</p>}
          <div className="w-full flex justify-center gap-x-2 mt-3">
            <label>Break Time:</label>
            <input
              className="bg-app-bg w-18 rounded-lg px-2"
              defaultValue={5}
              type="number"
              {...register("minutesBreak", {
                required: "No break? You're crazy",
                min: { value: 1, message: "Must be at least 1 minute" },
                max: { value: 60, message: "Must be at most 60 minutes" },
              })} />
            <span>minutes</span>
          </div>
          {errors.minutesBreak && <p className="text-red-800 text-sm text-center">{errors.minutesBreak.message}</p>}
          <div className="w-full flex justify-center gap-x-2 mt-3">
            <label >Receive notifications?</label>
            <input
              className="scale-150"
              type="checkbox"
              defaultChecked={true}
              {...register("notificationsEnabled")}
            />
          </div>
          <p className="text-sm text-center">*Notifications must be enabled on your computer and for the browser you are using</p>
          {errors.notificationsEnabled && <p className="text-red-800 text-sm text-center">{errors.notificationsEnabled.message}</p>}
          <div className="flex items-center ailgn-middle justify-center space-x-8">
            <button className="mt-5 p-2 text-center text-app-text rounded-xl font-bold bg-app-highlight w-fit btn-hover" type="submit">Lets go!</button>
            <button onClick={() => { setShowModal(false) }} className="mt-3 p-2 text-center text-app-text rounded-xl font-bold bg-app-bg w-fit btn-hover">Cancel</button>
          </div>
        </form>
        <p className="text-sm text-center mt-3">ℹ️  Working on any task will count towards your work time. Your break will automatically start.</p>
      </div>
    </div>
  );
}
