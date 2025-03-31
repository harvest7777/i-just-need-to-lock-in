"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PomodoroTimeDisplay from "./PomodoroTimeDisplay";

interface TimeFormInput {
  horusWork: number;
  minutesWork: number;
  minutesBreak: number;
}
export default function PomodoroTimer() {
  //note for future dev: ALL IN EPOCH TIME
  //
  const { handleSubmit, register, reset, formState: { errors } } = useForm<TimeFormInput>();

  const initialize = () => {
    const storedStartTime: string | null = localStorage.getItem("pomodoroStart");
    console.log(storedStartTime);
  }
  useEffect(() => {
    initialize();
  }, [])

  const onSubmit = (data: TimeFormInput) => {
    const pomodoroStart: number = Date.now();
    const pomodoroGoalMs: number = Number(data.minutesWork * 60 * 1000);
    localStorage.setItem("pomodoroStart", String(pomodoroStart));
    localStorage.setItem("pomodoroGoalMs", String(pomodoroGoalMs));
    reset();

  }
  return (
    <div>
      <p>Pomodoro</p>
      <PomodoroTimeDisplay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Working Time</label>
        <input
          defaultValue={25}
          type="number"
          {...register("minutesWork", {
            required: "Cmon you gotta work at least a little bit...",
            min: { value: 0, message: "Must be at least 0 minutes" },
            max: { value: 60, message: "Must be at most 60 minutes" },
          })} />
        {errors.minutesWork && <p className="text-red-800">{errors.minutesWork.message}</p>}
        <button className="btn-hover" type="submit">submit</button>
      </form>
    </div>
  )
}
