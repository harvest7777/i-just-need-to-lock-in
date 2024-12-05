// CompletedTasks.tsx
import React from "react";
import { Task } from "../_services/TaskSchema";

interface IncompleteTasksProps {
  dailyTasks: Task[];
  lockIntoTask: (task: Task) => void;
}

const IncompleteTasks : React.FC<IncompleteTasksProps> = ({ dailyTasks, lockIntoTask }) => {
  return (
    <div className="flex flex-col items-center w-1/3">
        <h1 className="font-bold text-center text-2xl">Remaining</h1>
            {dailyTasks?.map((task) => 
            // Task container
            !task.is_complete && (
            <div className="flex space-x-2" key={task.task_id}>
                <p className="w-44">{task.name}</p> 
                <p>{task.minutes_spent}</p>
                <button onClick={() => lockIntoTask(task)}>LOCK INTO THIS TASK</button>
            </div>                   
            )
            )}
    </div>
  );
};

export default IncompleteTasks;
