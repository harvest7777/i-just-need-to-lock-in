import { StateCreator } from "zustand";
import { TaskState } from "./createTaskSlice";
import { startTask, pauseTask, completeTask } from "@/app/(api)/taskTimeServices";

export interface TimerState {
  pomodoroEnabled: boolean;
  pomodoroStarted: boolean;
  breakMode: boolean;

}
export interface TimerAction {
  lockIntoTask: (task: Task) => void;
  handleCompleteTask: (task: Task) => void;
  handleStartTask: (task: Task) => void;
  handlePauseTask: (task: Task) => void;
  updateTaskAndStates: (task: Task, updatedTask: Task) => void;
  setPomodoroEnabled: (status: boolean) => void;
  setPomodoroStarted: (status: boolean) => void;
  setBreakMode: (status: boolean) => void;
}


export const createTimerSlice: StateCreator<
  TimerAction & TaskState & TimerState,
  [],
  [],
  TimerAction & TimerState
> = (set, get) => ({
  pomodoroEnabled: false,
  pomodoroStarted: false,
  breakMode: false,
  setBreakMode: (status: boolean) => set({ breakMode: status }),
  setPomodoroEnabled: (status: boolean) => set({ pomodoroEnabled: status }),
  setPomodoroStarted: (status: boolean) => set({ pomodoroStarted: status }),
  lockIntoTask: (task: Task) => {
    if (task === null) {
      set({ focusedTask: null });
      return;
    }
    if (get().focusedTask) {
      if (task.task_id == get().focusedTask?.task_id) return;
      get().handlePauseTask(get().focusedTask!);
    }
    set({ focusedTask: task })
    get().handleStartTask(task);
  },
  handleCompleteTask: async (task: Task) => {
    // Immediately update on ui
    set({ focusedTask: null })
    set({ startedFocusedTask: false })
    const completedTask = await completeTask(task);
    get().updateTaskAndStates(task, completedTask);
    set((state) => ({
      completedTasks: [...state.completedTasks!, completedTask]
    }))
  },
  handleStartTask: async (task: Task) => {
    // This comes first to update immediately on ui
    set({ startedFocusedTask: true });
    const startedTask = await startTask(task);
    // We must update the daily task with our new task data
    set((state) => ({
      toDos: state.toDos?.map((task) =>
        task.task_id === startedTask.task_id ? startedTask : task
      ) ?? []
    }));

    // We must update the focused task with the new task data
    set({ focusedTask: startedTask })

  },
  handlePauseTask: async (task: Task) => {
    // If you are pausing a task that's not focused, do nothing
    if (task.task_id !== get().focusedTask?.task_id) return;

    // Immediately update on ui
    set({ startedFocusedTask: false });
    // Pause the task and update it on the UI with the new total seconds spent
    const updatedTask: Task = await pauseTask(task);
    get().updateTaskAndStates(task, updatedTask);
    // set({ focusedTask: updatedTask })
  },
  updateTaskAndStates: (task: Task, updatedTask: Task) => {
    // Find the old task and replace it with new task. 
    // This also means new interval and new states because you only update on pause and complete

    set((state) => ({
      toDos: state.toDos?.map((task) =>
        task.task_id === updatedTask.task_id ? updatedTask : task
      ),
    }));

    // The task intervals need to be updated if the task was in progress
    let startTime = task.last_start_time;
    let endTime = new Date();

    // the task was not in progress
    if (startTime == null) return;


    const nowUTC = new Date();
    const lastStartTimeUTC = new Date(startTime);

    let newInterval: TaskInterval;

    // if task carried on to a new day
    if (lastStartTimeUTC.getDay() != nowUTC.getDay()) {
      const newDay = new Date();
      newDay.setHours(0, 0, 0, 0);
      newInterval = {
        id: task.task_id,
        task_id: task.task_id,
        start_time: newDay.toISOString(),
        end_time: endTime.toISOString()
      }
    } else {
      newInterval = {
        id: task.task_id,
        task_id: task.task_id,
        start_time: startTime,
        end_time: endTime.toISOString()
      }
    }
    // Client side state updates
    if (newInterval) {
      set((state) => ({
        taskIntervals: [...state.taskIntervals!, newInterval]
      }))
    }
  }
})

