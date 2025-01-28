// CompletedTasks.tsx
import React from "react";

interface CompletedTasksProps {
  completedTasks: Task[];
  taskIntervals: TaskInterval[];
}
const CompletedTasks: React.FC<CompletedTasksProps> = ({ completedTasks, taskIntervals }) => {
  // Pre-process intervals into a Map
  const intervalMap = processIntervals(taskIntervals);

  return (
    <div className="flex flex-col items-center w-full p-2">
      <h1 className="font-bold text-xl pl-2 w-full">Completed Today</h1>
      {completedTasks?.map((task) => {
        const totalSeconds = intervalMap.get(task.task_id) || 0;
        const totalMinutes = Math.round(totalSeconds / 60);

        return (
          <div className="flex w-full my-1" key={task.task_id}>
            <p className="italic pl-2 w-full line-through text-neutral-400">
              {task.name}
            </p>
            {/* depracated, no longer showing total minutes here */}
            {/* <p className="w-1/3 italic text-neutral-400 rounded-r-md rounded-tr-md text-right pr-2">
              {totalMinutes}m
            </p> */}
          </div>
        );
      })}
    </div>
  );
};

// Helper function to preprocess intervals
const processIntervals = (taskIntervals: TaskInterval[]) => {
  const intervalMap = new Map();

  taskIntervals.forEach((interval) => {
    const { task_id, start_time, end_time } = interval;
    const durationInSeconds =
      (new Date(end_time).getTime() - new Date(start_time).getTime()) / 1000;

    intervalMap.set(task_id, (intervalMap.get(task_id) || 0) + durationInSeconds);
  });

  return intervalMap;
};

export default CompletedTasks;