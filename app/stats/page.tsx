import WeeklyHistory from "./_components/WeeklyHistory";
import DailyPieChart from "./_components/DailyPieChart";
import HeaderCard from "@/components/ui/header-card";

export default function Stats() {
  return (
    <>
      <div className="flex flex-col space-y-5 justify-center align-middle items-center">
        <HeaderCard title="Statistics" />
        <div className="md:w-3/5 w-full">
          <DailyPieChart />
        </div>
        <div className="md:w-3/5 w-full">
          <WeeklyHistory />
        </div>
      </div>
    </>
  )
}
