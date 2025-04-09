import React, { useState, useEffect } from "react";

import { CiPause1 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";
import { IoCheckmarkOutline } from "react-icons/io5";
import { useTaskStore } from "../_hooks/useTaskStore";
import JSConfetti from "js-confetti";
import { useRef } from "react";

const LockedInTask = () => {
  const focusedTask = useTaskStore((state) => state.focusedTask);
  const startedFocusedTask = useTaskStore((state) => state.startedFocusedTask);
  const jsConfettiRef = useRef<JSConfetti | null>(null);
  const [lastClicked, setLastClicked] = useState<number | null>(null);
  const [clickAllowed, setClickAllowed] = useState<boolean>(true);


  // Actions (don't trigger re-renders)
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
        confettiNumber: 350,
      });
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      jsConfettiRef.current = new JSConfetti();
    }
  }, [])

  useEffect(() => {
    if (!lastClicked) return;
    const interval = setInterval(() => {
      const secondsSinceLastClick = (Date.now() - lastClicked) / 1000;
      const canClick = secondsSinceLastClick >= 1;
      setClickAllowed(canClick);
    }, 100)
    return () => clearInterval(interval);
  })


  return (
    <div className="w-full min-h-24 flex items-center align-middle justify-center space-x-5 rounded-xl outline-2 outline-app-bg">
      {/* Button container */}
      <h1 className="font-semibold md:text-2xl text-xl text-center"> {startedFocusedTask ? "🔒" : "🔓"} {focusedTask?.name}</h1>
      {!startedFocusedTask ? (
        <CiPlay1 className={`text-4xl btn-hover flex-none ${!clickAllowed ? "hover:cursor-not-allowed" : "hover:cursor-pointer"}`} onClick={() => {
          if (!clickAllowed) return;
          setLastClicked(Date.now())
          handleStartTask(focusedTask!)
        }} />
      ) : (
        <CiPause1 className={`text-4xl btn-hover flex-none ${!clickAllowed && "hover:cursor-not-allowed"}`} onClick={() => {
          if (!clickAllowed) return;
          setLastClicked(Date.now())
          handlePauseTask(focusedTask!)
        }} />
      )}
      <IoCheckmarkOutline className={`text-4xl btn-hover flex-none ${!clickAllowed && "hover:cursor-not-allowed"}`} onClick={() => {
        if (!clickAllowed) return;
        setLastClicked(Date.now())
        handleCompleteTask(focusedTask!);
        celebrate();
      }} />
    </div>
  );
};

export default LockedInTask;
