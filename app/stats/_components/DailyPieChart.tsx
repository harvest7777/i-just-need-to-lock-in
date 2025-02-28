"use client";
import { useState, useEffect } from "react";
import { useGetTasks } from "@/app/lockin/_hooks/useGetTasks"
import { useGroups } from "@/app/lockin/_hooks/useGroups"
import { getTimeDisplayFromSeconds } from "@/app/(helpers)/getTimeDisplay";

import { LabelList, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"

interface GroupData {
  name: String;
  secondsSpent: number;
  fill: String;
}

export default function DailyPieChart() {
  const { toDos, completedTasks, setToDos, taskIntervals } = useGetTasks();
  const { groups } = useGroups({ setToDos });

  // group id: data about that group
  const [chartData, setChartData] = useState<GroupData[]>([]);
  const [noData, setNoData] = useState<boolean>(true);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    secondsSpent: {
      label: "Time",
    },
  });


  const initialize = () => {

    let taskIdToSeconds = initializeTotalTaskSeconds(taskIntervals);
    let groupIdToSeconds = initializeTotalGroupSeconds(taskIdToSeconds);
    // populate the map with all the group names

    let newChartData = new Map;

    const colors: string[] = [
      "#A067C5", "#6F88C9", "#A07C6E", "#7FAF72", "#D47F87",
      "#C779A8", "#63A3B8", "#C29C74", "#B6B15B", "#6E9D8E",
      "#FFB74D", "#FF8A65", "#81C784", "#64B5F6", "#BA68C8",
      "#F06292", "#4DB6AC", "#FFD54F", "#E57373", "#7986CB"
    ];


    let colorIndex: number = 0;
    let newChartConfig: ChartConfig = {
      secondsSpent: { label: "Time" },
    };
    let otherGroup: GroupData = { name: "other", secondsSpent: groupIdToSeconds.get(-1)!, fill: colors[colorIndex++] };
    newChartData.set(-1, otherGroup);
    newChartConfig["other"] = { label: "other" };

    groups.forEach((group) => {
      let seconds: number | undefined = groupIdToSeconds.get(group.id);
      if (seconds == undefined) seconds = 0;
      if (seconds > 0) setNoData(false);
      let newGroupData: GroupData = { name: group.name, secondsSpent: seconds, fill: colors[colorIndex++] };
      newChartData.set(group.id, newGroupData);
      newChartConfig[group.name] = { label: group.name };
    })
    setChartData(Array.from(newChartData.values()));
    setChartConfig(newChartConfig);
  }

  const initializeTotalTaskSeconds = (taskIntervals: TaskInterval[]) => {
    let taskIdToSeconds: Map<number, number> = new Map;
    taskIntervals.forEach((interval) => {
      let prevSeconds = taskIdToSeconds.get(interval.task_id);
      if (prevSeconds == undefined) prevSeconds = 0;

      const start = new Date(interval.start_time);
      const end = new Date(interval.end_time);
      const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
      taskIdToSeconds.set(interval.task_id, prevSeconds + seconds);
    })
    return taskIdToSeconds;
  }

  const initializeTotalGroupSeconds = (taskIdToSeconds: Map<number, number>) => {
    let groupIdToSeconds: Map<number, number> = new Map;
    // union of todos and completed is your total tasks
    toDos.forEach((task) => {
      // get group id, -1 is "other" group
      let groupId = task.group_id;
      if (groupId == null) groupId = -1;

      let seconds: number | undefined = taskIdToSeconds.get(task.task_id);
      if (seconds == undefined) seconds = 0;

      let prevGroupSeconds: number | undefined = groupIdToSeconds.get(groupId);
      if (prevGroupSeconds == undefined) prevGroupSeconds = 0;
      groupIdToSeconds.set(groupId, prevGroupSeconds + seconds);
    })

    completedTasks.forEach((task) => {
      // get group id, -1 is "other" group
      let groupId = task.group_id;
      if (groupId == null) groupId = -1;

      let seconds: number | undefined = taskIdToSeconds.get(task.task_id);
      if (seconds == undefined) seconds = 0;

      let prevGroupSeconds: number | undefined = groupIdToSeconds.get(groupId);
      if (prevGroupSeconds == undefined) prevGroupSeconds = 0;
      groupIdToSeconds.set(groupId, prevGroupSeconds + seconds);
    })
    return groupIdToSeconds;
  }

  useEffect(() => {
    if (groups.length != 0 && toDos.length != 0) initialize();
  }, [toDos, groups, completedTasks, taskIntervals])

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active) return null;
    const { name, value } = payload[0]; // Extracting data

    return (
      <div className="p-2 bg-appFg shadow-md rounded-md border" >
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-600">
          {getTimeDisplayFromSeconds(value)}
        </p>
      </div>
    );
  };

  return (
    <div className="w-full card-outline bg-appFg flex flex-col items-center justify-center align-middle">
      <h1 className="text-2xl text-center font-bold py-3 pb-0">Your Day At A Glance</h1>
      {noData && <h1>No data yet, complete a session to see your pie chart!</h1>}
      <CardContent className="p-0 md:w-3/5 w-10/12">
        <ChartContainer
          config={chartConfig}
          className=" aspect-square min-h-[100px]"
        >
          <PieChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <ChartTooltip content={<CustomTooltip />} />
            {/* this is the actual data of the chart */}
            <Pie data={chartData} dataKey="secondsSpent">
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className=" -translate-y-2 flex-wrap gap-1 [&>*]:basis-1/3 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </div>
  )
}
