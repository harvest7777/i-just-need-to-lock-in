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
        <>
            {/* Currently locked into this task */}
            <div className="w-1/2">
                {focusedTask ? (
                    <div className="space-y-5">
                    <LockedInTask
                    focusedTask={focusedTask}
                    startedFocusedTask={startedFocusedTask}
                    handleStartTask={handleStartTask}
                    handlePauseTask={handlePauseTask}
                    handleCompleteTask={handleCompleteTask}
                    />
                    <Stopwatch taskId={focusedTask.task_id} startedFocusedTask={startedFocusedTask}/>
                    </div>
                ): (
                    <h1>Lock into a task by clicking "focus"</h1>
                )}
            </div>

            {/* All tasks container */}
            <div className="flex flex-row justify-center space-x-20">
                {/* Completed tasks container */}
                <div className="p-2 bg-pink-50 flex flex-col items-center w-1/3">
                    <NewCompletedTaskForm addCompletedTask={addCompletedTask}/>
                    <CompletedTasks dailyTasks={dailyTasks}/> 
                </div>
                {/* Incomplete tasks container */}
                <div className="p-2 bg-pink-50 flex flex-col items-center w-1/3">
                    {/* Task add container */}
                    <NewTaskForm addNewTask={addNewTask}/>
                    <IncompleteTasks dailyTasks={dailyTasks} lockIntoTask={lockIntoTask}/>
                </div>
            </div>
        </>
    )
}