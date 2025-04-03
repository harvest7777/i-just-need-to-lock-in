import { useEffect, useState } from "react"
import { formatTime } from "@/app/(helpers)/formatTime";
import WordBlock from "@/components/ui/word-block";
import { useTaskStore } from "../_hooks/useTaskStore";

export default function BreakTimer() {
  const [breakTime, setBreakTime] = useState<number>(-1)
  const [breakStartTime, setBreakStartTime] = useState<number | null>(null);
  const breakMode = useTaskStore((state) => state.breakMode);
  const setBreakMode = useTaskStore((state) => state.setBreakMode);

  useEffect(() => {
    const storedBreakTime: string | null = localStorage.getItem("breakTimeMs");
    if (storedBreakTime !== null) setBreakTime(Number(storedBreakTime));
  }, [])

  useEffect(() => {
    if (!breakMode) return;
    let breakStartTime: string | null = localStorage.getItem("breakStartTime");
    if (breakStartTime === null) {
      localStorage.setItem("breakStartTime", String(Date.now()));
    }
    const startTime: string = localStorage.getItem("breakStartTime")!;
    setBreakStartTime(Number(startTime));
  }, [breakMode])

  let seconds = -1;
  if (breakStartTime === null) seconds = Math.round(breakTime / 1000);
  else seconds = Math.round(breakTime - (Date.now() - breakStartTime) / 1000);
  if (seconds <= 0) {
    return (
      <div>
        <WordBlock className="w-fit !text-3xl p-2" text={`${formatTime(0)}🪿`} />
      </div>
    )
  }

  return (
    <div>
      <WordBlock className="w-fit !text-3xl p-2" text={`${formatTime(seconds)}🪿`} />
    </div>
  )
}
