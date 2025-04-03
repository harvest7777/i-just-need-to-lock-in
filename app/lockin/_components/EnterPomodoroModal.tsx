"use client";

import { useForm } from "react-hook-form";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTaskStore } from "../_hooks/useTaskStore";

interface EnterPomodoroModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

interface TimeFormInput {
  minutesWork: number;
  minutesBreak: number;
}

export default function EnterPomodoroModal({ setShowModal }: EnterPomodoroModalProps) {
  const { handleSubmit, register, reset, formState: { errors } } = useForm<TimeFormInput>();
  const setEnabled = useTaskStore((state) => state.setPomodoroEnabled);
  const onSubmit = (data: TimeFormInput) => {
    const pomodoroStart: number = Date.now();
    const pomodoroGoalMs: number = Number(data.minutesWork * 60 * 1000);
    const pomodoroBreak: number = Number(data.minutesBreak * 60 * 1000);
    localStorage.setItem("pomodoroStart", String(pomodoroStart));
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
        <div className="mt-3 w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-x-2 gap-y-3">
            <div className="w-2/5 flex justify-center gap-x-3 ">
              <label className=" w-1/2">Work Time:</label>
              <input
                className="bg-app-bg w-1/5 rounded-lg px-2"
                defaultValue={25}
                type="number"
                {...register("minutesWork", {
                  required: "Cmon you gotta work at least a little bit...",
                  min: { value: 0, message: "Must be at least 0 minutes" },
                  max: { value: 60, message: "Must be at most 60 minutes" },
                })} />
              <span>minutes</span>
            </div>
            {errors.minutesWork && <p className="text-red-800">{errors.minutesWork.message}</p>}
            <div className="w-2/5 flex justify-center gap-x-2 ">
              <label className="w-1/2">Break Time:</label>
              <input
                className="bg-app-bg w-1/5 rounded-lg px-2"
                defaultValue={5}
                type="number"
                {...register("minutesBreak", {
                  required: "No break? You're crazy",
                  min: { value: 0, message: "Must be at least 0 minutes" },
                  max: { value: 60, message: "Must be at most 60 minutes" },
                })} />
              <span>minutes</span>
            </div>
            {errors.minutesBreak && <p className="text-red-800">{errors.minutesBreak.message}</p>}
            <div className="flex items-center ailgn-middle justify-center space-x-8">
              <button className="mt-3 p-2 text-center text-app-text rounded-xl font-bold bg-app-highlight w-fit btn-hover" type="submit">Start!</button>
              <button onClick={() => { setShowModal(false) }} className="mt-3 p-2 text-center text-app-text rounded-xl font-bold bg-app-bg w-fit btn-hover">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
