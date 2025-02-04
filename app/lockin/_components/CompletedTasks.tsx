// CompletedTasks.tsx
import React, { Dispatch, SetStateAction, useState } from "react";
import ChooseCompleted from "./ChooseCompleted";
import { RiArrowGoBackFill } from "react-icons/ri";
import { markTaskIncomplete } from "../_services/UpdateDailyTasks";

interface CompletedTasksProps {
  completedTasks: Task[];
  taskIntervals: TaskInterval[];
  setToDos: Dispatch<SetStateAction<Task[]>>;
  setCompletedTasks: Dispatch<SetStateAction<Task[]>>;
}
const CompletedTasks: React.FC<CompletedTasksProps> = ({ completedTasks, taskIntervals, setToDos, setCompletedTasks }) => {
  // Pre-process intervals into a Map
  const intervalMap = processIntervals(taskIntervals);
  const [timeSpentDisplay, setTimeSpentDisplay] = useState<string>("today");
  
  const handleMarkTaskIncomplete = async (task: Task) => {
    const updatedTask = await markTaskIncomplete(task);
    setToDos((prev) => {
      const filtered = prev.filter((t) => t.task_id !== updatedTask.task_id);
      return [...filtered, updatedTask]; 
    });
    setCompletedTasks((prev)=>prev.filter((t)=>t.task_id!=updatedTask.task_id));
  }
  return (
    <div className="flex flex-col items-center w-full p-2">
      <h1 className="font-bold text-xl pl-2 w-full">Completed Today</h1>
      {completedTasks?.map((task) => {
        const dailySeconds = intervalMap.get(task.task_id) || 0;
        const dailyMinutes = Math.round(dailySeconds/ 60);
        const totalMinutes = Math.round(task.seconds_spent/60)
        return (
          <div className="flex w-full my-1" key={task.task_id}>
            <RiArrowGoBackFill onClick={()=>handleMarkTaskIncomplete(task)} className="text-appBg text-2xl btn-hover w-1/5 hover:text-orange-400"/>
            <p className="italic line-through w-3/5 text-neutral-400">
              {task.name}
            </p>
            {timeSpentDisplay=="today" && (<p className="w-1/5 italic text-neutral-400 rounded-r-md rounded-tr-md text-right pr-2">{dailyMinutes}m</p>)}
            {timeSpentDisplay=="total" && (<p className="w-1/5 italic text-neutral-400 rounded-r-md rounded-tr-md text-right pr-2">{totalMinutes}m</p>)}

          </div>
        );
      })}
      <ChooseCompleted timeSpentDisplay={timeSpentDisplay} setTimeSpentDisplay={setTimeSpentDisplay}/>
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