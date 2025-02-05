"use client";
import CompletedTasks from "./CompletedTasks";
import IncompleteTasks from "./IncompleteTasks";
import LockedInTask from "./LockedInTask";
import NewTaskForm from "./NewTaskForm";
import Stopwatch from "./TotalStopwatch";
import TimeGraph from "./TimeGraph"; 
import FriendsList from "@/app/friends/_components/FriendsList";
import Changelog from "./Changelog";
import { useGetTasks } from "../_hooks/useGetTasks";
import { useLockIntoTask } from "../_hooks/useLockIntoTask";
import { useManageTasks } from "../_hooks/useManageTasks";
import StillWorkingModal from "./ConfirmCancelSessionModal";
import DailyStopwatch from "./DailyStopwatch";
import { useState } from "react";
import ChooseDisplay from "./ChooseTimer";
import SessionStopWatch from "./SessionStopwatch";

export default function Dashboard() {
    const {toDos, setToDos, focusedTask, setFocusedTask, startedFocusedTask, setStartedFocusedTask, taskIntervals, setTaskIntervals, completedTasks, setCompletedTasks} = useGetTasks();
    const {lockIntoTask, handleStartTask, handlePauseTask, handleCompleteTask} = useLockIntoTask({focusedTask, setFocusedTask, setToDos, setTaskIntervals, setCompletedTasks,setStartedFocusedTask});
    const {addNewTask, handleRenameTask, handleDeleteTask} = useManageTasks({focusedTask, setFocusedTask, setToDos, setTaskIntervals, setStartedFocusedTask});

    const [timerDisplay, setTimerDisplay] = useState<string>("session");


    const [cancelVisible, setCancelVisible] = useState<boolean>(false);
    return(
        <>
        {cancelVisible&&<StillWorkingModal focusedTask={focusedTask} setFocusedTask={setFocusedTask} setToDos={setToDos} setStartedFocusedTask={setStartedFocusedTask} setCancelVisible={setCancelVisible}/>}
        <div className="flex md:flex-row md:gap-x-5 flex-col space-y-3">
            {/* graph and changelog container */}
            <div className="md:order-2 order-1 md:w-3/5 w-full flex flex-col">
                <div className="w-full flex flex-col bg-appFg rounded-2xl justify-center items-center p-3 h-fit my-3">
                    {/* locked in task and graph */}
                    {focusedTask? (
                        <>
                            <div className="w-full space-y-2 p-5 rounded-2xl h-min">
                            <LockedInTask focusedTask={focusedTask} handleCompleteTask={handleCompleteTask} startedFocusedTask={startedFocusedTask} handleStartTask={handleStartTask} handlePauseTask={handlePauseTask}/>
                            <div className="flex justify-center items-center align-middle space-x-2">
                            <ChooseDisplay timerDisplay={timerDisplay} setTimerDisplay={setTimerDisplay}/>
                            {timerDisplay=="today" && (
                                <DailyStopwatch focusedTask={focusedTask} startedFocusedTask={startedFocusedTask} taskIntervals={taskIntervals} setCancelVisible={setCancelVisible} />
                            )}
                            {timerDisplay=="total" && (
                                <Stopwatch focusedTask={focusedTask} startedFocusedTask={startedFocusedTask} setCancelVisible={setCancelVisible}/>
                            )} 
                            {timerDisplay=="session" && (
                                <SessionStopWatch focusedTask={focusedTask} startedFocusedTask={startedFocusedTask} setCancelVisible={setCancelVisible}/>
                            )}
                            </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-center lg:text-2xl text-xl w-full mb-2">Click the 🔒 next to any task to lock in!</p>
                    )}
                    <div className="w-full">
                        <TimeGraph taskIntervals={taskIntervals}/>
                    </div>
                </div>
                <Changelog/>
            </div>
            {/* container for task lists */}
            <div className="md:order-1 order-2 flex flex-col md:w-1/5 w-full space-y-3">
                <div className="bg-appFg rounded-2xl">
                    <IncompleteTasks toDos={toDos} lockIntoTask={lockIntoTask} handleRenameTask={handleRenameTask} handleDeleteTask={handleDeleteTask}/>
                    <NewTaskForm addNewTask={addNewTask}/>
                </div>
                <div className="bg-appFg rounded-2xl">
                    <CompletedTasks completedTasks={completedTasks} taskIntervals={taskIntervals} setToDos={setToDos} setCompletedTasks={setCompletedTasks}/>
                </div>
            </div>
            {/* container for friends */}
            <div className="flex flex-col md:w-1/5 order-3 w-full space-y-3">
                <div className="bg-appFg rounded-2xl">
                    <FriendsList />
                </div>
            </div>

        </div>
        </>
    )
}