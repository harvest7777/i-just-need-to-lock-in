"use client"
import { getMostLockedInFriends } from "../(api)/friendServices"
import { useState, useEffect } from "react"
import { LeaderboardData } from "../manage-friends/_services/leaderboard_schema";
import HeaderCard from "@/components/ui/header-card";

export default function Component() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardData[]>([]);
  const [leaderboardDay, setLeaderboardDay] = useState<LeaderboardData[]>([]);
  const [leaderboardWeek, setLeaderboardWeek] = useState<LeaderboardData[]>([]);
  const [show, setShow] = useState<String>("Day");
  const initialize = async () => {
    const lockedInFriendsDay = await getMostLockedInFriends("day");
    const lockedInFriendsWeek = await getMostLockedInFriends("week");
    setLeaderboard(lockedInFriendsDay);
    setLeaderboardDay(lockedInFriendsDay);
    setLeaderboardWeek(lockedInFriendsWeek);
  }
  useEffect(() => {
    initialize();
  }, [])

  return (
    <div className="flex flex-col items-center justify-center align-middle">
      <HeaderCard title="Top Locked Inners 😎" />
      <div className="w-96 mt-5 py-5 flex flex-col space-y-5 items-center justify-center align-middle bg-appFg card-outline">
        {/* option selection container */}
        <div className="flex text-2xl p-2 font-bold w-1/2 justify-between">
          <p onClick={() => { setShow("Day"); setLeaderboard(leaderboardDay) }} className={`${show === "Day" ? "text-emerald-600" : ""} btn-hover w-1/2 text-center`}>Day</p>
          <p onClick={() => { setShow("Week"); setLeaderboard(leaderboardWeek) }} className={`${show === "Week" ? "text-emerald-600" : ""} btn-hover w-1/2 text-center`}>Week</p>
        </div>
        {leaderboard.length >= 3 ? (
          <div className="flex flex-col items-center ">
            <div className="flex justify-center items-end gap-6 h-fit perspective">
              {/* Second Place */}
              <div className="flex flex-col items-center justify-center align-middle bg-gray-400 text-gray-950 font-bold w-24 rounded-lg p-2 podium-item h-36">
                <p>{leaderboard[1].friend_name}</p>
                <span className="text-2xl font-bold">🥈</span>
                <p>{leaderboard[1].formatted_locked}</p>
              </div>

              {/* First Place (Tallest) */}
              <div className="flex flex-col items-center justify-center align-middle bg-yellow-400 text-yellow-950 font-bold w-28 rounded-lg p-2 podium-item h-48">
                <p>{leaderboard[0].friend_name}</p>
                <span className="text-2xl font-bold">🥇</span>
                <p>{leaderboard[0].formatted_locked}</p>
              </div>

              {/* Third Place */}
              <div className="flex flex-col items-center justify-center align-middle bg-orange-400 text-orange-950 font-bold w-24 rounded-lg p-2 podium-item h-28">
                <p>{leaderboard[2].friend_name}</p>
                <span className="text-2xl font-bold">🥉</span>
                <p>{leaderboard[2].formatted_locked}</p>
              </div>
            </div>
            {/* all the other people */}
            <div className="mt-5 w-full divide-y divide-appBg px-2 rounded-xl">
              {leaderboard.slice(3).map((data, index) => (
                <div key={index} className="flex justify-between p-2">
                  <p>{index + 4}. {data.friend_name}</p>
                  <p>{data.formatted_locked}</p>
                </div>
              ))}
            </div>
            <div>
            </div>
          </div>
        ) : (<p>not engouh data</p>)
        }

      </div>
    </div>
  )
}

