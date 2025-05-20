"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTaskStore } from "../lockin/_hooks/useTaskStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import WordBlock from "@/components/ui/word-block";
import { RiArrowDropDownLine } from "react-icons/ri";

interface TaskPickerProps {
  setSelectedTask: Dispatch<SetStateAction<Task | null>>;
}

export default function TaskPicker({ setSelectedTask }: TaskPickerProps) {
  const toDos = useTaskStore((state) => state.toDos);
  const completedTasks = useTaskStore((state) => state.completedTasks);
  const idToTask = new Map();
  toDos?.forEach((task) => {
    idToTask.set(task.task_id, task);
  });

  completedTasks?.forEach((task) => {
    idToTask.set(task.task_id, task);
  });
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  useEffect(() => {
    if (selectedTaskId !== null) setSelectedTask(idToTask.get(selectedTaskId));
  }, [selectedTaskId]);

  return (
    <div className="relative z-10 w-full">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="w-full">
          <WordBlock
            className="w-full !text-lg"
            text={
              selectedTaskId
                ? idToTask.get(selectedTaskId).name
                : "select a task"
            }
          >
            <RiArrowDropDownLine />
          </WordBlock>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[var(--radix-popper-anchor-width)] mt-1 bg-app-fg border-none">
          <DropdownMenuRadioGroup
            value={String(selectedTaskId)}
            onValueChange={(v) => setSelectedTaskId(Number(v))}
          >
            {toDos?.map((task) => (
              <DropdownMenuRadioItem
                className="focus:bg-app-highlight"
                value={String(task.task_id)}
                key={task.task_id}
              >
                {task.name}
              </DropdownMenuRadioItem>
            ))}

            {completedTasks?.map((task) => (
              <DropdownMenuRadioItem
                className="focus:bg-app-highlight"
                value={String(task.task_id)}
                key={task.task_id}
              >
                {task.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
