"use client";
import { useState } from "react";
import EnterPomodoroModal from "./EnterPomodoroModal";
import { useTaskStore } from "../_hooks/useTaskStore";
export default function EnterPomodoroButton() {
  const enabled = useTaskStore((state) => state.pomodoroEnabled);
  const setEnabled = useTaskStore((state) => state.setPomodoroEnabled);
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggle = () => {
    //user wants to exit pomodoro mode
    if (enabled) {
      localStorage.removeItem("pomodoroStart");
      localStorage.removeItem("pomodoroGoalMs");
      localStorage.removeItem("totalPauseTimeMs");
      localStorage.removeItem("lastPauseTime");
      localStorage.removeItem("breakStartTime");
      localStorage.removeItem("breakTimeMs");
    } else {
      //user wants to enter pomodoro mode
      setShowModal(true);
    }
    setEnabled(!enabled);
  }
  return (
    <div>
      {showModal && <EnterPomodoroModal setShowModal={setShowModal} />}
      <p className="relative btn-hover text-lg font-bold text-app-highlight">
        {enabled ? (<span onClick={() => toggle()}>enter normal</span>) : (<span onClick={() => setShowModal(true)}>enter pomodoro</span>)}
      </p>
    </div>
  )
}
