"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export default function DemoGraph() {
  const chartData = [
    { time: "12AM", minutes: 0 },
    { time: "1AM", minutes: 0 },
    { time: "2AM", minutes: 0 },
    { time: "3AM", minutes: 0 },
    { time: "4AM", minutes: 0 },
    { time: "5AM", minutes: 0 },
    { time: "6AM", minutes: 0 },
    { time: "7AM", minutes: 40 },
    { time: "8AM", minutes: 50 },
    { time: "9AM", minutes: 15 },
    { time: "10AM", minutes: 0 },
    { time: "11AM", minutes: 30 },
    { time: "12PM", minutes: 60 },
    { time: "1PM", minutes: 60 },
    { time: "2PM", minutes: 40 },
    { time: "3PM", minutes: 0 },
    { time: "4PM", minutes: 0 },
    { time: "5PM", minutes: 45 },
    { time: "6PM", minutes: 30 },
    { time: "7PM", minutes: 40 },
    { time: "8PM", minutes: 30 },
    { time: "9PM", minutes: 0 },
    { time: "10PM", minutes: 0 },
    { time: "11PM", minutes: 0 }
  ];

  const chartConfig = {
    minutes: {
      label: "Minutes",
      color: "#10b981",
    },
  } satisfies ChartConfig

  return (
    <div className="h-full">
      <ChartContainer config={chartConfig} className="min-h-[100px] w-full pr-4">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} strokeDasharray={"3 3"} strokeWidth={3} stroke="#d7dde1" />
          <XAxis
            dataKey="time"
            tickLine={true}
            interval={4}
            tickSize={5}
            tickMargin={10}
            axisLine={false}
            padding={{ left: 0, right: 30 }}
          />
          <YAxis allowDataOverflow={false} tickCount={3} axisLine={false} unit={"m"} domain={[0, 60]} dx={-8}>
          </YAxis>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="minutes" fill="var(--color-minutes)" radius={3} barSize={100} />
        </BarChart>
      </ChartContainer>
      <p className="text-l text-gray-600 pl-6 text-center">7 hrs 20 m</p>
    </div>
  )
}
