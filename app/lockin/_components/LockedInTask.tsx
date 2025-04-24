import React, { useState, useEffect } from "react";

import { CiPause1 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";
import { IoCheckmarkOutline } from "react-icons/io5";
import { useTaskStore } from "../_hooks/useTaskStore";
import { useRef, useCallback } from "react";
import JSConfetti from "js-confetti";

const LockedInTask = () => {
  const jsConfettiRef = useRef<JSConfetti | null>(null);

  const focusedTask = useTaskStore((state) => state.focusedTask);
  const startedFocusedTask = useTaskStore((state) => state.startedFocusedTask);
  const [loading, setLoading] = useState<boolean>(false);

  // actions (no re render apparently)
  const { handleStartTask, handlePauseTask, handleCompleteTask } = useTaskStore();

  const celebrate = () => {
    if (jsConfettiRef.current) {
      jsConfettiRef.current.addConfetti({
        confettiColors: [
          '#ff3e3e', // Bright Red
          '#ff9f00', // Vibrant Orange
          '#ffdc3e', // Sunny Yellow
          '#3eff3e', // Bright Green
          '#3eb5ff', // Sky Blue
          '#763eff', // Deep Purple
          '#ff3ec9', // Hot Pink
          '#ffffff', // White
        ],
        confettiRadius: 7,
        confettiNumber: 200,
      });
    }
  }


  useEffect(() => {
    if (typeof window !== "undefined") {
      jsConfettiRef.current = new JSConfetti();
    }
  }, [])

  useEffect(() => {
    const handleKeyPress = async (event: KeyboardEvent) => {
      const pressedSpace: boolean = event.key === ' ';

      if (loading || !pressedSpace || !focusedTask) return;
      if (startedFocusedTask) {
        setLoading(true);
        console.log("pausing")
        await handlePauseTask(focusedTask);
        setLoading(false);
      } else {
        setLoading(true);
        console.log("resuming")
        await handleStartTask(focusedTask);
        setLoading(false);
      }
    }

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, [startedFocusedTask, loading, focusedTask])


  return (
    <div className="w-full min-h-24 flex items-center align-middle justify-center space-x-5 rounded-xl outline-2 outline-app-bg">
      {/* Button container */}
      <h1 className="font-semibold md:text-2xl text-xl text-center"> {startedFocusedTask ? "🔒" : "🔓"} {focusedTask?.name}</h1>
      {!startedFocusedTask ? (
        <CiPlay1 className={`text-4xl btn-hover flex-none ${loading && "hover:cursor-progress"}`}
          onClick={async () => {
            if (loading) return;
            setLoading(true);
            await handleStartTask(focusedTask!)
            setLoading(false);
          }} />
      ) : (
        <CiPause1 className={`text-4xl btn-hover flex-none ${loading && "hover:cursor-progress"}`}
          onClick={async () => {
            if (loading) return;
            setLoading(true);
            await handlePauseTask(focusedTask!);
            setLoading(false);
          }} />
      )}
      <IoCheckmarkOutline className={`text-4xl btn-hover flex-none ${loading && "hover:cursor-progress"}`}
        onClick={async () => {
          if (loading) return;
          setLoading(true);
          await handleCompleteTask(focusedTask!);
          celebrate();
          setLoading(false);
        }} />
    </div>
  );
};

export default LockedInTask;
