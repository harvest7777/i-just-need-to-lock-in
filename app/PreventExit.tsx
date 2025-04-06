"use client";
import { PropsWithChildren, useEffect } from "react";
import { useTaskStore } from "./lockin/_hooks/useTaskStore";

const PreventExit: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const startedFocusedTask = useTaskStore((state) => state.startedFocusedTask);
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
  }
  useEffect(() => {
    if (startedFocusedTask) window.addEventListener('beforeunload', handleBeforeUnload);
    else window.removeEventListener('beforeunload', handleBeforeUnload)

    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [startedFocusedTask])
  return (
    <>{children}</>
  )
}

export default PreventExit;
