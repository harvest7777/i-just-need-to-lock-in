"use client"

import { Bar, BarChart, CartesianGrid, Label, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 300 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Minutes",
    color: "#10b981",
  },
} satisfies ChartConfig

export default function Component() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-1/2">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} strokeDasharray={"3 3"} strokeWidth={1} stroke="#2563eb"/>
        <XAxis
          dataKey="month"
          tickLine={true}
          tickMargin={10}
          axisLine={true}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis allowDataOverflow={true} axisLine={false} tickCount={5} domain={[0,400]}> 
        <Label value={"hello"} dx={-20} dy={20}/>
        </YAxis> 
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
