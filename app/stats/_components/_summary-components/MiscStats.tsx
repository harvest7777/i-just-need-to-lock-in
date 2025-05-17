import { useTaskStore } from "@/app/lockin/_hooks/useTaskStore";
import { getTimeDisplayFromIntervals } from "@/app/(helpers)/getTimeDisplay";
import PreLoaderSmall from "@/app/_components/PreLoaderSmall";

interface MiscStatsProps {
  className?: string;
}

export default function MiscStats({ className }: MiscStatsProps) {
  const taskIntervals = useTaskStore((state) => state.taskIntervals);
  const completedTasks = useTaskStore((state) => state.completedTasks);

  if (!taskIntervals || !completedTasks) return <PreLoaderSmall />;

  const totalTime = getTimeDisplayFromIntervals(taskIntervals);
  return (
    <div className={`w-full px-5 ${className}`}>
      <ul className="w-full">
        <li className="w-full flex justify-between">
          <span>⌚ Total Locked In</span>
          <span className="flex-1 align-middle items-center mx-5 border-b-3 border-dotted border-app-bg self-center h-[0px]" />
          <span>{totalTime}</span>
        </li>
        <li className="w-full flex justify-between">
          <span>✅ Completed Today</span>
          <span className="flex-1 align-middle items-center mx-5 border-b-3 border-dotted border-app-bg self-center h-[0px]" />
          <span>{completedTasks.length}</span>
        </li>
        <li className="w-full flex justify-between">
          <span>🏁 Sessions</span>
          <span className="flex-1 align-middle items-center mx-5 border-b-3 border-dotted border-app-bg self-center h-[0px]" />
          <span>{taskIntervals.length}</span>
        </li>
      </ul>
    </div>
  );
}
