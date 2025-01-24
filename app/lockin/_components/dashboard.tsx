"use client";
import CompletedTasks from "./completed_tasks";
import IncompleteTasks from "./incomplete_tasks";
import LockedInTask from "./locked_in_task";
import NewTaskForm from "./new_task_form";
import Stopwatch from "./stopwatch";
import TimeGraph from "./time_graph"; 
import FriendsList from "@/app/friends/_components/friends_list";
import Changelog from "./changelog";
import { useGetTasks } from "../_hooks/useGetTasks";
import { useLockIntoTask } from "../_hooks/useLockIntoTask";
import { useManageTasks } from "../_hooks/useManageTasks";
import StillWorkingModal from "./still_working_modal";

export default function Dashboard() {
    const {dailyTasks, setDailyTasks, focusedTask, setFocusedTask, startedFocusedTask, setStartedFocusedTask, taskIntervals, setTaskIntervals} = useGetTasks();
    const {lockIntoTask, handleStartTask, handlePauseTask, handleCompleteTask} = useLockIntoTask({focusedTask, setFocusedTask, setDailyTasks, setTaskIntervals, setStartedFocusedTask});
    const {addNewTask, handleRenameTask, handleDeleteTask} = useManageTasks({focusedTask, setFocusedTask, setDailyTasks, setTaskIntervals, setStartedFocusedTask, handlePauseTask});
    return(
        <>
        <StillWorkingModal focusedTask={focusedTask}/>
        <div className="flex md:flex-row md:gap-x-5 flex-col space-y-3">
            <div className="md:order-last order-first md:w-4/5 w-full flex flex-col">
            <div className="w-full flex md:flex-row flex-col bg-appFg rounded-2xl justify-center items-center p-3 h-fit my-3">
                {/* Top half container */}
                {focusedTask? (
                    <>
                        <div className="md:w-2/5 w-full space-y-2 p-5 rounded-2xl h-min">
                        <p className="text-center italic">Currently locked into...</p>
                        <LockedInTask focusedTask={focusedTask} handleCompleteTask={handleCompleteTask} startedFocusedTask={startedFocusedTask} handleStartTask={handleStartTask} handlePauseTask={handlePauseTask}/>
                        <Stopwatch focusedTask={focusedTask} startedFocusedTask={startedFocusedTask} />
                        </div>
                    </>
                ) : (
                    <p className="text-center lg:text-3xl text-xl md:w-2/5 w-full mb-2">Not currently locked in!</p>
                )}
                <div className="md:w-3/5 w-full">
                    <TimeGraph taskIntervals={taskIntervals}/>
                </div>
            </div>
                <Changelog/>
            </div>
            <div className="flex flex-col md:w-1/5 md:order-2 order-last w-full space-y-3">
                <div className="bg-appFg rounded-2xl">
                    <IncompleteTasks dailyTasks={dailyTasks} lockIntoTask={lockIntoTask} handleRenameTask={handleRenameTask} handleDeleteTask={handleDeleteTask}/>
                    <NewTaskForm addNewTask={addNewTask}/>
                </div>
                <div className="bg-appFg rounded-2xl">
                    <CompletedTasks dailyTasks={dailyTasks}/>
                </div>
                <div className="bg-appFg rounded-2xl">
                    <FriendsList/>
                </div>
            </div>

        </div>
        </>
    )
}