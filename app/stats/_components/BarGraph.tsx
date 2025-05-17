"use client";

import { useState, useEffect } from "react";

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { calculateHourlyIntervals } from "@/app/(helpers)/calculateHourlyIntervals";
import { getTimeDisplayFromIntervals } from "@/app/(helpers)/getTimeDisplay";
import PreLoaderSmall from "../../_components/PreLoaderSmall";

interface BarGraphProps {
  taskIntervals: TaskInterval[] | null;
  showTotal?: boolean;
  maxHeight?: number;
}

const BarGraph: React.FC<BarGraphProps> = ({
  taskIntervals,
  showTotal,
  maxHeight,
}) => {
  // This component houses the hourintervals for the graph display
  // This component houses the time display
  const [hourIntervals, setHourIntervals] = useState<number[] | null>(null);
  const [timeDisplay, setTimeDisplay] = useState<string>("0 min");

  useEffect(() => {
    if (taskIntervals !== null) {
      setHourIntervals(calculateHourlyIntervals(taskIntervals));
      setTimeDisplay(getTimeDisplayFromIntervals(taskIntervals));
    }
  }, [taskIntervals]);

  if (hourIntervals === null) {
    return <PreLoaderSmall />;
  }
  const chartData = [
    { time: "12AM", minutes: hourIntervals[0] },
    { time: "1AM", minutes: hourIntervals[1] },
    { time: "2AM", minutes: hourIntervals[2] },
    { time: "3AM", minutes: hourIntervals[3] },
    { time: "4AM", minutes: hourIntervals[4] },
    { time: "5AM", minutes: hourIntervals[5] },
    { time: "6AM", minutes: hourIntervals[6] },
    { time: "7AM", minutes: hourIntervals[7] },
    { time: "8AM", minutes: hourIntervals[8] },
    { time: "9AM", minutes: hourIntervals[9] },
    { time: "10AM", minutes: hourIntervals[10] },
    { time: "11AM", minutes: hourIntervals[11] },
    { time: "12PM", minutes: hourIntervals[12] },
    { time: "1PM", minutes: hourIntervals[13] },
    { time: "2PM", minutes: hourIntervals[14] },
    { time: "3PM", minutes: hourIntervals[15] },
    { time: "4PM", minutes: hourIntervals[16] },
    { time: "5PM", minutes: hourIntervals[17] },
    { time: "6PM", minutes: hourIntervals[18] },
    { time: "7PM", minutes: hourIntervals[19] },
    { time: "8PM", minutes: hourIntervals[20] },
    { time: "9PM", minutes: hourIntervals[21] },
    { time: "10PM", minutes: hourIntervals[22] },
    { time: "11PM", minutes: hourIntervals[23] },
  ];

  const appHighlightColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-app-highlight")
    .trim();
  const strokeColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-app-bg")
    .trim();

  const chartConfig = {
    minutes: {
      label: "Minutes",
      color: appHighlightColor || "#10b981",
    },
  } satisfies ChartConfig;

  return (
    <div className="h-full">
      <ChartContainer
        config={chartConfig}
        className={`min-h-[100px] max-h-[${maxHeight ? maxHeight : "250"}px] w-full pr-4`}
      >
        <BarChart data={chartData}>
          <CartesianGrid
            vertical={false}
            strokeDasharray={"3 3"}
            strokeWidth={3}
            stroke={strokeColor}
          />
          <XAxis
            dataKey="time"
            tickLine={true}
            interval={4}
            tickSize={5}
            tickMargin={10}
            axisLine={false}
            padding={{ left: 0, right: 30 }}
            tick={{ fontSize: 14 }}
          />
          <YAxis
            tick={{ fontSize: 14 }}
            allowDataOverflow={false}
            tickCount={3}
            axisLine={false}
            unit={"m"}
            domain={[0, 60]}
            dx={-8}
          />
          <Tooltip
            cursor={false}
            content={<ChartTooltipContent className="bg-app-fg border-none" />}
          />
          <Bar
            dataKey="minutes"
            fill="var(--color-minutes)"
            radius={3}
            barSize={100}
          />
        </BarChart>
      </ChartContainer>
      {showTotal !== false && (
        <p className="text-l text-app-text pl-6 text-center">{timeDisplay}</p>
      )}
    </div>
  );
};

export default BarGraph;
