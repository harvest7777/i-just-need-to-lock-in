import { StateCreator } from 'zustand';

// the only responsibility of usetaskstore is to manage the state of tasks.
//
export interface TaskState {
  toDos: Task[] | null;
  completedTasks: Task[] | null;
  focusedTask: Task | null;
  startedFocusedTask: boolean | null;
  taskIntervals: TaskInterval[] | null;
}

export interface TaskAction {
  setToDos: (tasks: Task[]) => void;
  setCompletedTasks: (tasks: Task[]) => void;
  setFocusedTask: (task: Task | null) => void;
  setStartedFocusedTask: (started: boolean) => void;
  setTaskIntervals: (intervals: TaskInterval[]) => void;
}

export const createTaskSlice: StateCreator<
  TaskState & TaskAction,
  [],
  [],
  TaskState & TaskAction
> = (set) => ({
  // just initializing shit
  toDos: null,
  completedTasks: null,
  focusedTask: null,
  startedFocusedTask: null,
  taskIntervals: null,

  // these r ur new setters
  setToDos: (tasks: Task[]) => set({ toDos: tasks }),
  setCompletedTasks: (tasks: Task[]) => set({ completedTasks: tasks }),
  setFocusedTask: (task: Task | null) => set({ focusedTask: task }),
  setStartedFocusedTask: (isStarted: boolean) => set({ startedFocusedTask: isStarted }),
  setTaskIntervals: (taskIntervals: TaskInterval[]) => set({ taskIntervals: taskIntervals })

})

