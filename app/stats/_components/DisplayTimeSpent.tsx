import { TPastTaskTime } from "@/app/(api)/taskTimeServices";
import { secondsToHoursMins } from "@/app/(helpers)/formatTime";

interface DisplayTimeSpentProps {
  tasks: TPastTaskTime[];
  className?: string;
}
export default function DisplayTimeSpent({
  tasks,
  className,
}: DisplayTimeSpentProps) {
  if (!tasks || tasks.length === 0) return;
  return (
    <ul className={`w-full list-none flex flex-col px-5 gap-y-1 ${className}`}>
      {tasks.map((task: TPastTaskTime) => (
        <li
          key={task.task_id}
          className="flex justify-between w-full items-center align-middle"
        >
          <span className="line-clamp-1">{task.task_name}</span>
          <span className="flex-1 align-middle items-center mx-5 border-b-3 border-dotted border-app-bg self-center h-[0px]" />
          <span className="">
            {secondsToHoursMins(Math.floor(task.time_spent))}
          </span>
        </li>
      ))}
    </ul>
  );
}
