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
} from "@/components/ui/chart"

interface GroupData {
  name: String;
  secondsSpent: number;
  fill: String;
}


const chartConfig = {
  secondsSpent: {
    label: "Time",
  },
} satisfies ChartConfig

export default function DailyPieChart() {
  const { toDos, completedTasks, setToDos, taskIntervals } = useGetTasks();
  const { groups } = useGroups({ setToDos });

  // group id: data about that group
  const [chartData, setChartData] = useState<GroupData[]>([]);

  const initialize = () => {

    let taskIdToSeconds = initializeTotalTaskSeconds(taskIntervals);
    let groupIdToSeconds = initializeTotalGroupSeconds(taskIdToSeconds);
    // populate the map with all the group names

    let newChartData = new Map;

    const colors: string[] = [
      "#A067C5", // Brighter Lavender  
      "#6F88C9", // Soft Royal Blue  
      "#A07C6E", // Warm Mocha  
      "#7FAF72", // Fresh Sage  
      "#D47F87", // Cheerful Dusty Rose  
      "#C779A8", // Playful Mauve  
      "#63A3B8", // Lively Blue-Green  
      "#C29C74", // Warm Honey Beige  
      "#B6B15B", // Bright Olive  
      "#6E9D8E"  // Vibrant Teal  
    ];


    let colorIndex: number = 0;

    let otherGroup: GroupData = { name: "other", secondsSpent: groupIdToSeconds.get(-1)!, fill: colors[colorIndex++] };
    newChartData.set(-1, otherGroup);

    groups.forEach((group) => {
      let seconds: number | undefined = groupIdToSeconds.get(group.id);
      if (seconds == undefined) seconds = 0;
      let newGroupData: GroupData = { name: group.name, secondsSpent: seconds, fill: colors[colorIndex++] };
      newChartData.set(group.id, newGroupData);
    })
    setChartData(Array.from(newChartData.values()));
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

  const displayName = (name: String): String => {
    const group = chartData.find((group: GroupData) => group.name === name && group.secondsSpent > 0);
    return group ? name : "";
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
      <CardContent className="p-0 md:w-3/5 w-10/12">
        <ChartContainer
          config={chartConfig}
          className=" aspect-square min-h-[100px]"
        >
          <PieChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <ChartTooltip content={<CustomTooltip />} />
            {/* this is the actual data of the chart */}
            <Pie data={chartData} dataKey="secondsSpent">
              <LabelList
                dataKey="name"
                className="fill-background"
                stroke="none"
                fontSize={20}
                formatter={(value: String) => (displayName(value))}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </div>
  )
}
