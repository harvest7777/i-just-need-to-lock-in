import { useEffect } from "react"
import { useTaskStore } from "../_hooks/useTaskStore"
import { initializeTaskStore } from "@/app/(helpers)/taskStoreInit";

import PreLoaderSmall from "./PreLoaderSmall";

export default function TestZustand() {
  const { toDos, focusedTask, lockIntoTask } = useTaskStore();
  useEffect(() => {
    initializeTaskStore();
  }, [])

  if (toDos === null) {
    return (
      <PreLoaderSmall />
    )
  }
  return (
    <div>
      <p>THIS IS FOR TRESTING ONLY</p>
      {toDos.map((task: Task) => (
        <p onClick={() => lockIntoTask(task)} key={task.task_id}>{task.name}</p>
      ))}
      <p>{focusedTask?.name}</p>
    </div>
  )
}
