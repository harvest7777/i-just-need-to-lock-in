"use client";

import React, { SetStateAction, useState, Dispatch, useEffect } from "react";

import { DndContext, DragEndEvent, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';

import { updateTaskGroup } from "@/app/(api)/taskServices";

import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaFolderOpen } from "react-icons/fa";
import { IoMdFolder } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";

import ConfirmDeleteModal from "./ConfirmDeleteModal";
import DraggableTask from "./DraggableTask";
import DroppableTask from "./DroppableTask";
import EditTaskName from "./EditTaskName";
import EditGroupName from "./EditGroupName";
import ConfirmDeleteGroupModal from "./ConfirmDeleteGroupModal";

import { useTaskStore } from "../_hooks/useTaskStore";
import PreLoaderSmall from "./PreLoaderSmall";

const IncompleteTasks = () => {
  const toDos = useTaskStore((state) => state.toDos);
  const groups = useTaskStore((state) => state.groups);
  const focusedTask = useTaskStore((state) => state.focusedTask);

  // Actions (don’t trigger re-renders)
  const { lockIntoTask, handleRenameTask, handleDeleteTask, handleRenameGroup, handleDeleteGroup, setToDos } = useTaskStore();
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);

  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [groupToDelete, setGroupToDelete] = useState<Group | null>(null);

  const [shownGroups, setShownGroups] = useState<number[]>([]);


  const handleToggleShowGroup = (id: number) => {
    // if not in group
    if (!shownGroups.includes(id)) {
      setShownGroups((prev) => [...prev, id]);
    } else {
      // in group already
      setShownGroups(shownGroups.filter((g) => g != id))
    }
  }

  const countToDos = (id: number): number => {
    let count = 0;
    toDos!.forEach((task) => {
      if (task.group_id === id && !task.is_complete) count++;
    })
    return count;
  }

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,    // delay in ms before drag activation
      tolerance: 50,  // pointer movement tolerance in px
    },
  });

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      delay: 200,    // delay in ms before drag activation
      tolerance: 50,  // pointer movement tolerance in px
    },
  })

  const sensors = useSensors(
    touchSensor,
    pointerSensor,
  );

  const handleDropTask = async (event: DragEndEvent) => {
    // can do like if !event.over just set group id to null
    document.body.style.touchAction = 'auto';
    if (!event.active || !event.active.id) return;
    // set the current task to an updated version
    // do this by finding the task with the same id as active, then setting its gropu id to the id of over
    let overId: number | null = null;
    if (event.over) overId = Number(event.over.id);

    const activeId: number = Number(event.active.id);
    const taskToUpdate: Task = toDos!.find((task: Task) => task.task_id == activeId)!;
    let updatedToDos: Task[] = toDos!.map((task: Task) => task.task_id === activeId ? { ...task, group_id: overId } : task)
    setToDos(updatedToDos);
    await updateTaskGroup(taskToUpdate, overId);

  }

  if (toDos === null || groups === null) {
    return (
      <PreLoaderSmall />
    )
  }

  return (
    <DndContext onDragEnd={handleDropTask} sensors={sensors}>
      <div className="flex flex-col items-center w-full p-2 pt-0 draggable select-none">
        <ConfirmDeleteModal taskToDelete={taskToDelete} setTaskToDelete={setTaskToDelete} handleDeleteTask={handleDeleteTask} />
        <ConfirmDeleteGroupModal groupToDelete={groupToDelete} setGroupToDelete={setGroupToDelete} handleDeleteGroup={handleDeleteGroup} />
        {groups.map((group: Group) => (
          <DroppableTask id={group.id} key={group.id} className="w-full">
            {/* group managing contents */}
            <div className="relative group flex space-x-2">
              {shownGroups.includes(group.id) ?
                (<FaFolderOpen className="flex-none text-2xl text-app-bg btn-hover" onClick={() => handleToggleShowGroup(group.id)} />) : (
                  <IoMdFolder className="flex-none text-2xl text-app-bg btn-hover" onClick={() => handleToggleShowGroup(group.id)} />)}

              {editingGroupId == group.id ? (
                <EditGroupName group={group} handleRenameGroup={handleRenameGroup} setEditingGroupId={setEditingGroupId} />
              ) : (
                <div className="flex flex-1">
                  <div className="flex-1 gap-x-2 hover:cursor-pointer" onClick={() => handleToggleShowGroup(group.id)}>
                    <span className={`hover:cursor-pointer  ${shownGroups.includes(group.id) && "font-semibold"} `} onClick={() => handleToggleShowGroup(group.id)}>{group.name}</span>
                    <span className=""> {!shownGroups.includes(group.id) && `(${countToDos(group.id)})`}</span>
                  </div>
                  <div className="flex flex-none">
                    <RiDeleteBin6Line className="hidden group-hover:block text-2xl flex-none btn-hover text-app-bg hover:text-red-800" onClick={() => setGroupToDelete(group)} />
                    <MdOutlineDriveFileRenameOutline className="hidden group-hover:block text-2xl flex-none btn-hover text-app-bg hover:text-blue-600" onClick={() => { setEditingGroupId(group.id); setEditingTaskId(null); }} />
                  </div>
                </div>)}
            </div>

            {/* vertical line to seperate folders */}
            <div className="relative pl-4">
              <div className="absolute left-1 top-0 h-full bg-red-500 border-l-2 border-app-bg"></div>

              {/* all tasks part of this group */}
              {toDos.filter((task: Task) => task.group_id === group.id && !task.is_complete && shownGroups.includes(group.id))
                .map((task: Task) => (
                  <DraggableTask className=" group relative flex space-x-1 w-full rounded-xl my-1 bg-app-fg touch-none" key={task.task_id} id={task.task_id}>
                    {/* if the task is being edited, show input box */}
                    {editingTaskId === task.task_id ? (
                      <EditTaskName handleRenameTask={handleRenameTask} task={task} setEditingTaskId={setEditingTaskId} />
                    ) : (
                      <>
                        <p className="flex-1 rounded-lg">{task.name}</p>
                        <div className="flex space-x-1" onPointerDown={(e) => { e.stopPropagation() }} onTouchStart={(e) => { e.stopPropagation() }} onMouseDown={(e) => { e.stopPropagation() }}>
                          <RiDeleteBin6Line className="hidden group-hover:block text-2xl flex-none btn-hover text-app-bg hover:text-red-800" onClick={() => { setTaskToDelete(task) }} />
                          <MdOutlineDriveFileRenameOutline className="hidden group-hover:block text-2xl flex-none btn-hover text-app-bg hover:text-blue-600" onClick={() => { setEditingTaskId(task.task_id); setEditingGroupId(null); }} />
                          <FaRegStar className={`text-2xl flex-none btn-hover text-app-bg ${focusedTask?.task_id == task.task_id && 'text-yellow-400'} hover:text-yellow-600`} onClick={() => lockIntoTask(task)} />
                        </div>
                      </>
                    )}
                  </DraggableTask>
                ))}
            </div>
          </DroppableTask>
        ))}

        {/* map the rest of the tasks */}

        {toDos?.map((task) => (!task.is_complete && !task.group_id) && (
          // list out incomplete tasks and corresponding buttons
          <DraggableTask className=" group relative space-x-1 flex w-full rounded-xl my-1 bg-app-fg touch-none" key={task.task_id} id={task.task_id}>
            {/* if the task is being edited, show input box */}
            {editingTaskId === task.task_id ? (
              <EditTaskName handleRenameTask={handleRenameTask} task={task} setEditingTaskId={setEditingTaskId} />
            ) : (
              <>
                <p className="flex-1 rounded-lg ">{task.name}</p>
                <div className="flex space-x-1" onPointerDown={(e) => { e.stopPropagation() }} onTouchStart={(e) => { e.stopPropagation() }} onMouseDown={(e) => { e.stopPropagation() }}>
                  <RiDeleteBin6Line className="hidden group-hover:block text-2xl flex-none btn-hover text-app-bg hover:text-red-800" onClick={() => { setTaskToDelete(task) }} />
                  <MdOutlineDriveFileRenameOutline className="hidden group-hover:block text-2xl flex-none btn-hover text-app-bg hover:text-blue-600" onClick={() => { setEditingTaskId(task.task_id); setEditingGroupId(null); }} />
                  <FaRegStar className={`text-2xl flex-none btn-hover text-app-bg ${focusedTask?.task_id == task.task_id && 'text-yellow-400'} hover:text-yellow-600`} onClick={() => lockIntoTask(task)} />
                </div>
              </>
            )}
          </DraggableTask>
        ))}
      </div>
    </DndContext>
  );
};

export default IncompleteTasks;
