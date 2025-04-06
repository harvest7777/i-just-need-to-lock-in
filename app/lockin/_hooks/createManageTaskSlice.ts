import { StateCreator } from "zustand";
import { TaskState } from "./createTaskSlice";
import { insertDailyTask, deleteTask, renameTask } from "@/app/(api)/taskServices";
import { broadcastUpdatedTask } from "@/app/(api)/realtimeServices";

export interface ManageTaskActions {
  addNewTask: (taskName: string) => void;
  handleRenameTask: (task: Task, newName: string) => void;
  handleDeleteTask: (task: Task) => void;
}

export const createManageTaskSlice: StateCreator<
  ManageTaskActions & TaskState,
  [],
  [],
  ManageTaskActions> = (set, get) => ({
    addNewTask: async (taskName: string) => {
      if (get().toDos === null) return;
      // Add task in DB and immediately update on client side
      const newTask = await insertDailyTask(taskName);
      set((state) => ({
        toDos: [...state.toDos!, newTask]

      }))
    },
    handleRenameTask: async (task: Task, newName: string) => {
      if (get().toDos === null) return;
      // Rename task in DB and immediately update on client side
      const renamedTask = await renameTask(task, newName);
      set((state) => ({
        toDos: state.toDos?.map((task) => (
          task.task_id === renamedTask.task_id ? renamedTask : task
        ))
      }))
      let curFocused = get().focusedTask;
      if (curFocused?.task_id === renamedTask.task_id) {
        curFocused.name = renamedTask.name;
        set({ focusedTask: curFocused })
      }
    },
    handleDeleteTask: async (task: Task) => {
      // If trying to delete focused task, pause and reset states
      if (get().focusedTask?.task_id == task.task_id) {
        // Pausing task emits you aren't working on a task anymore
        task.last_start_time = null;
        broadcastUpdatedTask(task);
        set({ focusedTask: null });
        set({ startedFocusedTask: false });
      }
      // Delete the task from db and immediately update on client side
      const deletedTask = await deleteTask(task);
      set((state) => ({
        toDos: state.toDos?.filter((t) => t.task_id != deletedTask.task_id)
      }))
      set((state) => ({
        taskIntervals: state.taskIntervals?.filter((t) => t.task_id != deletedTask.task_id)
      }))
    }
  })
