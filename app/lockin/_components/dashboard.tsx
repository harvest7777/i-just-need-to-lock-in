"use client";
import { useTasks } from "../_hooks/useTasks";
import CompletedTasks from "./completed_tasks";
import IncompleteTasks from "./incomplete_tasks";
import LockedInTask from "./locked_in_task";
import NewTaskForm from "./new_task_form";
import Stopwatch from "./stopwatch";
import TimeGraph from "./time_graph"; 
import FriendsList from "@/app/manage-friends/_components/friends_list";

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
        taskIntervals,
        renameTask,
        handleDeleteTask
        } = useTasks();
    
    return(
        // Wrapper to hold all components horizontally
        <div className="flex flex-row w-full h-max space-x-3">
            {/* Left 1/5 of the page */}
            <div className="flex flex-col lg:w-1/5 w-2/5 space-y-3">
                <div className="bg-appFg rounded-2xl">
                    <IncompleteTasks dailyTasks={dailyTasks} lockIntoTask={lockIntoTask} renameTask={renameTask} handleDeleteTask={handleDeleteTask}/>
                    <NewTaskForm addNewTask={addNewTask}/>
                </div>
                <div className="bg-appFg rounded-2xl">
                    <CompletedTasks dailyTasks={dailyTasks}/>
                </div>
                <div className="bg-appFg rounded-2xl">
                    <FriendsList/>
                </div>
            </div>
            {/* Middle 4/5 of the page */}
            <div className="lg:w-4/5 w-3/5 flex lg:flex-row flex-col bg-appFg rounded-2xl justify-center items-center p-3 h-fit">

                {/* Top half container */}
                {focusedTask? (
                    <>
                        <div className="lg:w-2/5 w-full space-y-2 p-5 mt-5 rounded-2xl h-min">
                        <Stopwatch focusedTask={focusedTask} startedFocusedTask={startedFocusedTask} taskId={focusedTask.task_id}/>
                        <LockedInTask focusedTask={focusedTask} handleCompleteTask={handleCompleteTask} startedFocusedTask={startedFocusedTask} handleStartTask={handleStartTask} handlePauseTask={handlePauseTask}/>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-3xl w-2/5">Not currently locked in!</p>
                )}
                <div className="lg:w-3/5 w-full">
                    <TimeGraph dailyTasks={dailyTasks} taskIntervals={taskIntervals}/>
                </div>
            </div>
        </div>
    )
}