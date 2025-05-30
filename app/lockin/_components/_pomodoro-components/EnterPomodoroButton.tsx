"use client";
import { useState } from "react";
import EnterPomodoroModal from "./EnterPomodoroModal";
import { useTaskStore } from "../../_hooks/useTaskStore";
export default function EnterPomodoroButton() {
  const enabled = useTaskStore((state) => state.pomodoroEnabled);
  const setEnabled = useTaskStore((state) => state.setPomodoroEnabled);
  const setBreakMode = useTaskStore((state) => state.setBreakMode);
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggle = () => {
    //whether they want to exit or not, u should start with a fresh slate
    localStorage.removeItem("pomodoroStart");
    localStorage.removeItem("pomodoroGoalMs");
    localStorage.removeItem("totalPauseTimeMs");
    localStorage.removeItem("lastPauseTime");
    localStorage.removeItem("breakStartTime");
    localStorage.removeItem("breakTimeMs");
    //user wants to exit pomodoro mode
    if (enabled) {
      setBreakMode(false);
      setEnabled(false);
      document.title = "LOCK IN";
    } else {
      //user wants to enter pomodoro mode
      setShowModal(true);
    }
  };
  return (
    <div>
      {<EnterPomodoroModal showModal={showModal} setShowModal={setShowModal} />}
      <p className="relative btn-hover text-lg font-bold text-app-highlight">
        {enabled ? (
          <span onClick={() => toggle()}>normal mode</span>
        ) : (
          <span onClick={() => toggle()}>pomodoro</span>
        )}
      </p>
    </div>
  );
}
