"use client";
import { useTasks } from "../_hooks/useTasks";
import CompletedTasks from "./completed_tasks";
import IncompleteTasks from "./incomplete_tasks";
import LockedInTask from "./locked_in_task";
import NewTaskForm from "./new_task_form";
import NewCompletedTaskForm from "./new_completed_task_form";
import Stopwatch from "./stopwatch";
  
export default function LockIn() {
    const { 
        dailyTasks, 
        focusedTask, 
        startedFocusedTask, 
        lockIntoTask, 
        handleStartTask, 
        handlePauseTask, 
        handleCompleteTask, 
        addNewTask, 
        addCompletedTask } = useTasks();

    return(
        // Page container
        <div className="flex flex-col items-center">
            {/* All tasks container */}
            <div className="flex flex-row justify-center space-x-16">
                {/* Completed tasks container */}
                <div className="flex flex-col items-center w-1/3 ">
                    <NewCompletedTaskForm addCompletedTask={addCompletedTask}/>
                    <CompletedTasks dailyTasks={dailyTasks}/> 
                </div>
                {/* Incomplete tasks container */}
                <div className="w-1/3 flex flex-col items-center">
                    {/* Task add container */}
                    <NewTaskForm addNewTask={addNewTask}/>
                    <IncompleteTasks dailyTasks={dailyTasks} lockIntoTask={lockIntoTask}/>
                </div>
            </div>

            {/* Currently locked into this task */}
            {focusedTask && (
                <div>
                <LockedInTask
                focusedTask={focusedTask}
                startedFocusedTask={startedFocusedTask}
                handleStartTask={handleStartTask}
                handlePauseTask={handlePauseTask}
                handleCompleteTask={handleCompleteTask}
                />
                <Stopwatch taskId={focusedTask.task_id} startedFocusedTask={startedFocusedTask}/>
                </div>
            )}
        </div>
    )
}