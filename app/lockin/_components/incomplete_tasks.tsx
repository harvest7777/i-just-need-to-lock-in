// CompletedTasks.tsx
import React from "react";
import { Task } from "../_services/TaskSchema";
import NewTaskForm from "./new_task_form";

interface IncompleteTasksProps {
  dailyTasks: Task[];
  lockIntoTask: (task: Task) => void;
}

const IncompleteTasks : React.FC<IncompleteTasksProps> = ({ dailyTasks, lockIntoTask }) => {
  return (
    <div className="flex flex-col items-center w-full p-2">
        <h1 className="text-center text-2xl italic">In progress</h1>
            {dailyTasks?.map((task) => 
            // Task container
            !task.is_complete && (
            <div className="my-1 flex space-x-1 w-full" key={task.task_id}>
                <p className="w-5/6 bg-neutral-200 rounded-lg pl-3">{task.name}</p> 
                <button className="w-1/6 bg-neutral-500 rounded-lg" onClick={() => lockIntoTask(task)}>🔒</button>
            </div>                   
            )
            )}
    </div>
  );
};

export default IncompleteTasks;
