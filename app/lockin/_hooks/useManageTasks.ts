import { Dispatch, SetStateAction } from "react"

import { insertDailyTask, deleteTask, renameTask } from "@/app/(api)/taskServices";
import { broadcastUpdatedTask } from "@/app/(api)/realtimeServices";

interface useManageTasksProps {
    focusedTask: Task|null;
    setToDos: Dispatch<SetStateAction<Task[]>>;
    setTaskIntervals: Dispatch<SetStateAction<TaskInterval[]>>;
    setStartedFocusedTask: Dispatch<SetStateAction<boolean>>;
    setFocusedTask: Dispatch<SetStateAction<Task|null>>;
}

export const useManageTasks = ({focusedTask, setToDos, setTaskIntervals, setStartedFocusedTask, setFocusedTask}: useManageTasksProps) => {

    const addNewTask = async (taskName: string) => {
        // Add task in DB and immediately update on client side
        const newTask = await insertDailyTask(taskName);
        setToDos((prev)=>[...prev,newTask]);
    };

    const handleRenameTask = async(task: Task, newName: string) => {
        // Rename task in DB and immediately update on client side
        const renamedTask = await renameTask(task, newName);
        setToDos((prev) => prev.map((task)=> (
            task.task_id===renamedTask.task_id? renamedTask: task
        )));
        if(focusedTask?.task_id===renamedTask.task_id) focusedTask.name=renamedTask.name;
    };

    const handleDeleteTask = async(task: Task) => {
        // If trying to delete focused task, pause and reset states
        if(focusedTask?.task_id==task.task_id) {
            // Pausing task emits you aren't working on a task anymore
            task.last_start_time=null;
            broadcastUpdatedTask(task);
            setFocusedTask(null);
            setStartedFocusedTask(false);
        }
        // Delete the task from db and immediately update on client side
        const deletedTask = await deleteTask(task);
        setToDos((prev)=> prev.filter((t) => t.task_id!=deletedTask.task_id));
        setTaskIntervals((prev)=>prev.filter((t)=> t.task_id!=deletedTask.task_id));
    }
    return {addNewTask, handleRenameTask, handleDeleteTask};
}