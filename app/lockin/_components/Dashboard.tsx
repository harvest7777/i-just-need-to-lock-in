"use client";

import { useState } from "react";

import CompletedTasks from "./CompletedTasks";
import IncompleteTasks from "./IncompleteTasks";
import LockedInTask from "./LockedInTask";
import NewTaskForm from "./NewTaskForm";
import Stopwatch from "./TotalStopwatch";
import BarGraph from "./BarGraph";
import FriendsList from "@/app/friends/_components/FriendsList";
import Changelog from "./Changelog";
import StillWorkingModal from "./ConfirmCancelSessionModal";
import DailyStopwatch from "./DailyStopwatch";
import ChooseDisplay from "./ChooseTimer";
import SessionStopWatch from "./SessionStopwatch";

import { useGetTasks } from "../_hooks/useGetTasks";
import { useLockIntoTask } from "../_hooks/useLockIntoTask";
import { useManageTasks } from "../_hooks/useManageTasks";
import { useGroups } from "../_hooks/useGroups";
import NewGroupButton from "./NewGroupButton";

export default function Dashboard() {
  const { toDos, setToDos, focusedTask, setFocusedTask, startedFocusedTask, setStartedFocusedTask, taskIntervals, setTaskIntervals, completedTasks, setCompletedTasks } = useGetTasks();
  const { lockIntoTask, handleStartTask, handlePauseTask, handleCompleteTask } = useLockIntoTask({ focusedTask, setFocusedTask, setToDos, setTaskIntervals, setCompletedTasks, setStartedFocusedTask });
  const { addNewTask, handleRenameTask, handleDeleteTask } = useManageTasks({ focusedTask, setFocusedTask, setToDos, setTaskIntervals, setStartedFocusedTask });
  const { groups, setGroups, handleMakeGroup, handleRenameGroup, handleDeleteGroup } = useGroups({ setToDos });

  const [timerDisplay, setTimerDisplay] = useState<string>("session");
  const [cancelVisible, setCancelVisible] = useState<boolean>(false);

  return (
    <>
      {cancelVisible && <StillWorkingModal focusedTask={focusedTask} setFocusedTask={setFocusedTask} setToDos={setToDos} setStartedFocusedTask={setStartedFocusedTask} setCancelVisible={setCancelVisible} />}
      <div className="flex md:flex-row md:gap-x-2 flex-col md:space-y-0 space-y-3">
        {/* graph and changelog container */}
        <div className="md:order-2 order-1 md:w-3/5 w-full flex flex-col">
          <div className="w-full flex flex-col bg-app-fg card-outline justify-center items-center p-3 h-fit">
            {/* locked in task and graph */}
            {focusedTask ? (
              <>
                <div className="w-full space-y-5 p-5 rounded-2xl h-min">
                  <LockedInTask focusedTask={focusedTask} handleCompleteTask={handleCompleteTask} startedFocusedTask={startedFocusedTask} handleStartTask={handleStartTask} handlePauseTask={handlePauseTask} />
                  <div className="flex justify-center items-center align-middle space-x-2">
                    <ChooseDisplay timerDisplay={timerDisplay} setTimerDisplay={setTimerDisplay} />
                    {timerDisplay == "today" && (
                      <DailyStopwatch focusedTask={focusedTask} startedFocusedTask={startedFocusedTask} taskIntervals={taskIntervals} setCancelVisible={setCancelVisible} />
                    )}
                    {timerDisplay == "total" && (
                      <Stopwatch focusedTask={focusedTask} startedFocusedTask={startedFocusedTask} setCancelVisible={setCancelVisible} />
                    )}
                    {timerDisplay == "session" && (
                      <SessionStopWatch focusedTask={focusedTask} startedFocusedTask={startedFocusedTask} setCancelVisible={setCancelVisible} />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-center lg:text-2xl text-xl w-full mb-2">Click the ⭐ next to any task to lock in!</p>
            )}
            <div className="w-full">
              <BarGraph taskIntervals={taskIntervals} />
            </div>
          </div>
        </div>
        {/* container for task lists */}
        <div className="md:order-1 order-2 flex flex-col md:w-1/5 w-full space-y-3">
          <div className="bg-app-fg card-outline">
            <div className="flex justify-between w-full p-2 pb-0">
              <h1 className="font-bold text-xl pl-2 flex-1">To Do</h1>
              <NewGroupButton handleMakeGroup={handleMakeGroup} setGroups={setGroups} />
            </div>
            <IncompleteTasks toDos={toDos} focusedTask={focusedTask} setToDos={setToDos} groups={groups} lockIntoTask={lockIntoTask} handleRenameTask={handleRenameTask} handleDeleteTask={handleDeleteTask} handleRenameGroup={handleRenameGroup} handleDeleteGroup={handleDeleteGroup} />
            <NewTaskForm addNewTask={addNewTask} />
          </div>
          <div className="bg-app-fg card-outline">
            <CompletedTasks completedTasks={completedTasks} taskIntervals={taskIntervals} setToDos={setToDos} setCompletedTasks={setCompletedTasks} />
          </div>
        </div>
        {/* container for friends */}
        <div className="flex flex-col md:w-1/5 order-3 w-full space-y-3">
          <div className="bg-app-fg card-outline">
            <FriendsList />
          </div>
        </div>

      </div>
    </>
  )
}
