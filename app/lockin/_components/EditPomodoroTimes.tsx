import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

interface TimeFormInput {
  minutesWork: number;
  minutesBreak: number;
}


export default function EditPomodoroTimes() {
  const { register, watch, getValues, setValue, trigger, formState: { errors } } = useForm<TimeFormInput>({ mode: "onChange" });


  const minutesWorkValue = watch("minutesWork");
  const minutesBreakValue = watch("minutesBreak");

  const changeMinutes = (fieldName: keyof TimeFormInput, mins: number) => {
    const current: number = Number(getValues(fieldName));
    const next = Math.max(0, Math.min(60, current + mins));
    setValue(fieldName, next, { shouldValidate: true });
  }


  //we handle these 2 side effects seperately because they are set seperately.
  //doesnt make sense to deny both values just bc one is invalid
  useEffect(() => {
    //validate before storing to local storage
    if (errors.minutesWork || !minutesWorkValue) return;

    setValue("minutesWork", Number(minutesWorkValue), { shouldValidate: true });
    const pomodoroGoalMs: number = Number(minutesWorkValue) * 60 * 1000;
    localStorage.setItem("pomodoroGoalMs", String(pomodoroGoalMs));
    trigger("minutesWork")

  }, [minutesWorkValue])

  useEffect(() => {
    if (errors.minutesBreak || !minutesBreakValue) return;
    setValue("minutesBreak", Number(minutesBreakValue), { shouldValidate: true });
    const breakTimeMs = Number(minutesBreakValue) * 60 * 1000;
    localStorage.setItem("breakTimeMs", String(breakTimeMs));
    trigger("minutesBreak")
  }, [minutesBreakValue])

  //at this point these should NOT be null because the user is in pomodor pomodoro mode
  //if they are null something fr went wrong lol
  let defaultMinutesWork = 25;
  let storedMinutesWork: string | null = localStorage.getItem("pomodoroGoalMs");
  if (storedMinutesWork) defaultMinutesWork = Number(storedMinutesWork) / 60000;


  let defaultMinutesBreak = 5;
  let storedMinutesBreak: string | null = localStorage.getItem("breakTimeMs");
  if (storedMinutesBreak) defaultMinutesBreak = Number(storedMinutesBreak) / 60000;


  return (
    <form className="w-full flex flex-col items-center mt-5">
      <div className="w-full flex justify-center gap-x-2 ">
        <label>Work Time:</label>
        <input
          className="bg-app-bg w-18 rounded-lg px-2"
          defaultValue={defaultMinutesWork}
          type="number"
          {...register("minutesWork", {
            required: "Cmon you gotta work at least a little bit...",
            min: { value: 5, message: "Must be at least 5 minutes" },
            max: { value: 60, message: "Must be at most 60 minutes" },
            onChange: () => trigger("minutesWork")
          })} />
        <span>minutes</span>
        <div onClick={() => changeMinutes("minutesWork", 5)} className="btn-hover bg-app-highlight rounded-lg p-1">
          <FaPlus />
        </div>
        <div onClick={() => changeMinutes("minutesWork", -5)} className="btn-hover bg-app-highlight rounded-lg p-1">
          <FaMinus />
        </div>
      </div>
      {errors.minutesWork && <p className="text-red-800 text-sm text-center">{errors.minutesWork.message}</p>}
      <div className="w-full flex justify-center gap-x-2 mt-3">
        <label>Break Time:</label>
        <input
          className="bg-app-bg w-18 rounded-lg px-2"
          defaultValue={defaultMinutesBreak}
          type="number"
          {...register("minutesBreak", {
            required: "No break? You're crazy",
            min: { value: 1, message: "Must be at least 1 minute" },
            max: { value: 60, message: "Must be at most 60 minutes" },
            onChange: () => trigger("minutesBreak")
          })} />
        <span>minutes</span>
        <div onClick={() => changeMinutes("minutesBreak", 5)} className="btn-hover bg-app-highlight rounded-lg p-1">
          <FaPlus />
        </div>
        <div onClick={() => changeMinutes("minutesBreak", -5)} className="btn-hover bg-app-highlight rounded-lg p-1">
          <FaMinus />
        </div>
      </div>
      {errors.minutesBreak && <p className="text-red-800 text-sm text-center">{errors.minutesBreak.message}</p>}
      <div className="mt-5 flex items-center ailgn-middle justify-center space-x-8">
      </div>
    </form>
  )
}
