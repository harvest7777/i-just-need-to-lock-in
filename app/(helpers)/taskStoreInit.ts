import { getTodaysTasks, getCompletedTasks, getInProgressTask } from "@/app/(api)/taskServices";
import { getTaskIntervals } from "@/app/(api)/taskIntervalServices";
import { useTaskStore } from "../lockin/_hooks/useTaskStore";
import { getGroups } from "@/app/(api)/taskGroupServices";

export const initializeTaskStore = async () => {
  const fetchedTasks = await getTodaysTasks();
  const fetchedTaskIntervals = await getTaskIntervals();
  const fetchedCompletedTasks = await getCompletedTasks();
  const fetchedGroups: Group[] = await getGroups();

  const { setToDos, setFocusedTask, setTaskIntervals, setCompletedTasks, setStartedFocusedTask, setGroups, setPomodoroEnabled, setPomodoroStarted } = useTaskStore.getState();

  setToDos(fetchedTasks);
  setTaskIntervals(fetchedTaskIntervals);
  setCompletedTasks(fetchedCompletedTasks);
  setGroups(fetchedGroups);
  if (localStorage.getItem("pomodoroStart") !== null) setPomodoroEnabled(true);
  if (localStorage.getItem("pomodoroStart") !== null && localStorage.getItem("lastPauseTime") !== null) setPomodoroStarted(true);

  // check if the user was working on a task
  const inProgressTask: Task | null = await getInProgressTask();

  // set state accordingly
  if (inProgressTask) {
    setStartedFocusedTask(true);
    setFocusedTask(inProgressTask);
  }
}

