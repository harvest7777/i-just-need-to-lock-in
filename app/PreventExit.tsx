"use client";
import { PropsWithChildren, useEffect } from "react";
import { useTaskStore } from "./lockin/_hooks/useTaskStore";
import { usePathname } from "next/navigation";

const PreventExit: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const startedFocusedTask = useTaskStore((state) => state.startedFocusedTask);
  const pathname = usePathname();
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
  }
  useEffect(() => {
    const isDashboard = pathname.startsWith("/lockin");
    if (startedFocusedTask && isDashboard) window.addEventListener('beforeunload', handleBeforeUnload);
    else window.removeEventListener('beforeunload', handleBeforeUnload)

    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [startedFocusedTask])
  return (
    <>{children}</>
  )
}

export default PreventExit;
