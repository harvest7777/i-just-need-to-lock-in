import { Dispatch, SetStateAction } from "react"
import { insertDailyTask } from "../_services/InsertDailyTasks";
import { deleteTask, renameTask } from "../_services/UpdateDailyTasks";
import { broadcastUpdatedTask } from "../_services/TaskTimeUtils";

interface useManageTasksProps {
    focusedTask: Task|null;
    setDailyTasks: Dispatch<SetStateAction<Task[]>>;
    setTaskIntervals: Dispatch<SetStateAction<TaskInterval[]>>;
    setStartedFocusedTask: Dispatch<SetStateAction<boolean>>;
    setFocusedTask: Dispatch<SetStateAction<Task|null>>;
}

export const useManageTasks = ({focusedTask, setDailyTasks, setTaskIntervals, setStartedFocusedTask, setFocusedTask}: useManageTasksProps) => {

    const addNewTask = async (taskName: string) => {
        // Add task in DB and immediately update on client side
        const newTask = await insertDailyTask(taskName);
        setDailyTasks((prev)=>[...prev,newTask]);
    };

    const handleRenameTask = async(task: Task, newName: string) => {
        // Rename task in DB and immediately update on client side
        const renamedTask = await renameTask(task, newName);
        setDailyTasks((prev) => prev.map((task)=> (
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
        setDailyTasks((prev)=> prev.filter((t) => t.task_id!=deletedTask.task_id));
        setTaskIntervals((prev)=>prev.filter((t)=> t.task_id!=deletedTask.task_id));
    }
    return {addNewTask, handleRenameTask, handleDeleteTask};
}