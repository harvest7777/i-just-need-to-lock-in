"use client";
import { LabelList, Pie, PieChart } from "recharts"

import { getTimeDisplayFromSeconds } from "./(helpers)/getTimeDisplay";

import {
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

const chartData: GroupData[] = [
  { name: "🌍projects", secondsSpent: 13600, fill: "#A067C5" },
  { name: "📙homework", secondsSpent: 8000, fill: "#6F88C9" },
  { name: "🌿self care", secondsSpent: 4800, fill: "#A07C6E" },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (!active) return null;
  const { name, value } = payload[0]; // Extracting data

  return (
    <div className="p-2 bg-[#f9fbfc] shadow-md rounded-md border" >
      <p className="font-semibold">{name}</p>
      <p className="text-sm text-gray-600">
        {getTimeDisplayFromSeconds(value)}
      </p>
    </div>
  );
};

const displayName = (name: String): String => {
  const group = chartData.find((group: GroupData) => group.name === name && group.secondsSpent > 0);
  return group ? name : "";
}

export default function DemoPieChart() {
  return (

    <div className="w-full bg-[#f9fbfc] flex flex-col items-center justify-center align-middle">
      <h1 className="text-[#242129] text-2xl text-center font-bold py-3 pb-0">Your Day At A Glance</h1>
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
                fontSize={16}
                formatter={(value: String) => (displayName(value))}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </div>
  )
}
