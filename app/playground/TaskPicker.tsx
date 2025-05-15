"use client";
import { useState } from "react";
import { useTaskStore } from "../lockin/_hooks/useTaskStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TaskPicker() {
  const toDos = useTaskStore((state) => state.toDos);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  console.log(toDos);

  return (
    <div className="relative z-10 w-full">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="w-full h-10 border rounded text-center outline-app-bg outline-1 border-none">
          {selectedTaskId ? selectedTaskId : "select a task"}
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
