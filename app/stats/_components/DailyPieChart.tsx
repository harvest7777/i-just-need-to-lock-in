"use client";
import { supabase } from "@/utils/supabase/supabase";
import { getUserId } from "@/app/(api)/profileServices";
import { getTimeDisplayFromSeconds } from "@/app/(helpers)/getTimeDisplay";
import { useEffect, useState } from "react";

import { Pie, PieChart } from "recharts"
import PreLoaderSmall from "@/app/lockin/_components/PreLoaderSmall";

import {
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
  name: string;
  secondsSpent: number;
  fill: string;
}

const colors: string[] = [
  "#A067C5", "#6F88C9", "#A07C6E", "#7FAF72", "#D47F87",
  "#C779A8", "#63A3B8", "#C29C74", "#B6B15B", "#6E9D8E",
  "#FFB74D", "#FF8A65", "#81C784", "#64B5F6", "#BA68C8",
  "#F06292", "#4DB6AC", "#FFD54F", "#E57373", "#7986CB"
];
export default function Playground() {
  const [chartData, setChartData] = useState<GroupData[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  const [loading, setLoading] = useState<boolean>(true);

  const initialize = async () => {
    const userId = await getUserId();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const { data, error } = await supabase.rpc('test', { user_timezone: timezone, cur_uuid: userId });
    if (error) console.log(error);

    // making the chart data
    let groupDataArray: GroupData[] = [];
    let colorIndex = 0;
    let newChartConfig: ChartConfig = {
      secondsSpent: { label: "Time" },
    };

    if (data) {
      for (const d of data) {
        let processedName = "ungrouped tasks"
        if (d.group_name != null) processedName = d.group_name;

        const newGroupData: GroupData = {
          name: processedName,
          secondsSpent: d.total_time,
          fill: colors[colorIndex++]
        }
        groupDataArray.push(newGroupData);
        newChartConfig[processedName] = { label: processedName }
      }
    }

    setChartData(groupDataArray);
    setChartConfig(newChartConfig);
    setLoading(false);

  }
  useEffect(() => {
    initialize();
  }, [])

  if (loading) {
    return (

      <div className="w-full card-outline bg-app-fg flex flex-col items-center justify-center align-middle">
        <PreLoaderSmall />
      </div>
    )
  }
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active) return null;
    const { name, value } = payload[0]; // Extracting data

    return (
      <div className="p-2 bg-app-fg shadow-md rounded-md border" >
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-600">
          {getTimeDisplayFromSeconds(value)}
        </p>
      </div>
    );
  };

  return (
    <div className="w-full card-outline bg-app-fg flex flex-col items-center justify-center align-middle">
      <h1 className="text-2xl text-center font-bold py-3 pb-0">Your Day At A Glance</h1>
      {chartData.length === 0 ? (
        <p className="py-5">You have no hours logged today, nothing to show here :(</p>
      ) : (

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
                className=" -translate-y-2 flex-wrap gap-1 *:basis-1/3 *:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      )}
    </div>
  )
}
