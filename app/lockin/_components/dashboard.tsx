"use client";
import { useTasks } from "../_hooks/useTasks";
import CompletedTasks from "./completed_tasks";
import IncompleteTasks from "./incomplete_tasks";
import LockedInTask from "./locked_in_task";
import NewTaskForm from "./new_task_form";
import Stopwatch from "./stopwatch";
import TimeGraph from "./time_graph"; 
import FriendsList from "@/app/friends/_components/friends";

export default function Dashboard() {
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
        // Wrapper to hold all components horizontally
        <div className="flex flex-row w-full h-max p-3 bg-neutral-300 space-x-3">
            {/* Left 1/6 of the page */}
            <div className="bg-neutral-50 w-1/5 h-screen rounded-lg">
                <IncompleteTasks dailyTasks={dailyTasks} lockIntoTask={lockIntoTask}/>
                <NewTaskForm addNewTask={addNewTask}/>
                <CompletedTasks dailyTasks={dailyTasks}/>
            </div>
            {/* Middle 4/6 of the page */}
            <div className="bg-neutral-50 w-3/5 h-screen p-3 rounded-lg">

                {/* Top half container */}
                <div className="mt-10">
                {focusedTask? (
                    <>
                        <LockedInTask focusedTask={focusedTask} handleCompleteTask={handleCompleteTask} startedFocusedTask={startedFocusedTask} handleStartTask={handleStartTask} handlePauseTask={handlePauseTask}/>
                        <div className="mt-4 rounded-lg outline-double outline-8 outline-emerald-950 bg-neutral-100 p-5 m-2 mb-10">
                        <Stopwatch focusedTask={focusedTask} startedFocusedTask={startedFocusedTask} taskId={focusedTask.task_id}/>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-3xl">Not currently locked in!</p>
                )}
                </div>
                <TimeGraph dailyTasks={dailyTasks}/>
            </div>
            {/* Right 1/6 of the page */}
            <div className="bg-neutral-50 w-1/5 h-screen rounded-lg">
                <FriendsList/>
            </div>
        </div>
    )
}