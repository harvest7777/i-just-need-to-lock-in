"use client";

import React, { useState } from "react";

import ChooseCompleted from "./ChooseCompleted";
import { RiArrowGoBackFill } from "react-icons/ri";

import { markTaskIncomplete } from "@/app/(api)/taskServices";
import { useTaskStore } from "../_hooks/useTaskStore";
import PreLoaderSmall from "./PreLoaderSmall";

const CompletedTasks = () => {
  // Pre-process intervals into a Map
  const { completedTasks, taskIntervals, setToDos, setCompletedTasks, toDos } = useTaskStore();
  const [timeSpentDisplay, setTimeSpentDisplay] = useState<string>("today");
  const intervalMap = processIntervals(taskIntervals);

  const handleMarkTaskIncomplete = async (task: Task) => {
    const updatedTask = await markTaskIncomplete(task);
    const taskExists = toDos!.some(todo => todo.task_id === updatedTask.task_id);

    const updatedToDos = taskExists
      ? toDos!.map(todo =>
        todo.task_id === updatedTask.task_id ? updatedTask : todo
      )
      : [...toDos!, updatedTask];

    console.log(updatedToDos);
    setToDos(updatedToDos);
    const updatedCompleted = completedTasks!.filter((t) => t.task_id !== updatedTask.task_id);
    setCompletedTasks(updatedCompleted);
  }
  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${mins}m`;
  }
  if (completedTasks === null || taskIntervals === null) {
    return (
      <div className="flex flex-col items-center w-full p-2">
        <h1 className="font-bold text-xl pl-2 w-full">Completed Today</h1>
        <PreLoaderSmall />
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center w-full p-2">
      <h1 className="font-bold text-xl pl-2 w-full">Completed Today</h1>
      {completedTasks.length === 0 && (
        <div className="italic text-app-bg p-2 w-full">
          <span>No completed tasks today, lets get started 💪</span>
        </div>
      )}
      {completedTasks
        .slice() // to avoid mutating original
        .sort((a, b) => (intervalMap.get(b.task_id) || 0) - (intervalMap.get(a.task_id) || 0))
        .map((task) => {
          const dailySeconds = intervalMap.get(task.task_id) || 0;
          const dailyMinutes = Math.round(dailySeconds / 60);
          const totalMinutes = Math.round(task.seconds_spent / 60)
          return (
            <div className="flex w-full my-1 space-x-2" key={task.task_id}>
              <RiArrowGoBackFill onClick={() => handleMarkTaskIncomplete(task)} className="text-app-bg text-2xl btn-hover flex-none hover:text-orange-400" />
              <p className="italic line-through flex-1 text-app-text">
                {task.name}
              </p>
              {timeSpentDisplay == "today" && (<p className="flex-none italic text-app-text rounded-r-md rounded-tr-md text-right pr-2">{formatMinutes(dailyMinutes)}</p>)}
              {timeSpentDisplay == "total" && (<p className="flex-none italic text-app-text rounded-r-md rounded-tr-md text-right pr-2">{formatMinutes(totalMinutes)}</p>)}

            </div>
          );
        })}
      <ChooseCompleted timeSpentDisplay={timeSpentDisplay} setTimeSpentDisplay={setTimeSpentDisplay} />
    </div>
  );
};

// Helper function to preprocess intervals
const processIntervals = (taskIntervals: TaskInterval[] | null) => {
  const intervalMap = new Map();

  if (taskIntervals === null) return intervalMap;
  taskIntervals.forEach((interval) => {
    const { task_id, start_time, end_time } = interval;
    const durationInSeconds =
      (new Date(end_time).getTime() - new Date(start_time).getTime()) / 1000;

    intervalMap.set(task_id, (intervalMap.get(task_id) || 0) + durationInSeconds);
  });

  return intervalMap;
};

export default CompletedTasks;
