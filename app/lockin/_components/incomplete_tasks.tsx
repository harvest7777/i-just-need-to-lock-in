// CompletedTasks.tsx
import React from "react";
import { Task } from "../_services/TaskSchema";
import { CiLock } from "react-icons/ci";
interface IncompleteTasksProps {
  dailyTasks: Task[];
  lockIntoTask: (task: Task) => void;
}

const IncompleteTasks : React.FC<IncompleteTasksProps> = ({ dailyTasks, lockIntoTask }) => {
  return (
    <div className="flex flex-col items-center w-full p-2">
            <h1 className="font-bold text-xl pl-2 w-full">In progress</h1>
            {dailyTasks?.map((task) => 
            // Task container
            !task.is_complete && (
            <div className="my-1 flex space-x-1 w-full rounded-xl" key={task.task_id}>
                <CiLock className="text-2xl w-1/6 btn-hover hover:text-green-600" onClick={()=>lockIntoTask(task)}/>
                <p className="w-5/6 rounded-lg">{task.name}</p> 
            </div>                   
            )
            )}
    </div>
  );
};

export default IncompleteTasks;
