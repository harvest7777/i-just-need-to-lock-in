import Leaderboard from "./_components/Leaderboard"
import HeaderCard from "@/components/ui/header-card"
export default function LeaderboardPage() {
  return (
    <div className="flex flex-col items-center align-middle justify-center space-y-5">
      <HeaderCard title="Top Locked Inners 😎" />
      <Leaderboard />
    </div>
  )
}
