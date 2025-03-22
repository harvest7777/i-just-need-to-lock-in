"use client";
import { LeaderboardData } from "@/app/manage-friends/_services/leaderboard_schema";

export default function DemoLeaderboard() {

  const leaderboard: LeaderboardData[] = [
    {
      friend_uuid: "",
      friend_name: "icu",
      locked: "",
      formatted_locked: "12h 55m"
    },
    {
      friend_uuid: "",
      friend_name: "joda",
      locked: "",
      formatted_locked: "5h 30m"
    },
    {
      friend_uuid: "",
      friend_name: "kaytlin",
      locked: "",
      formatted_locked: "5h 29m"
    },
    {
      friend_uuid: "",
      friend_name: "josephh",
      locked: "",
      formatted_locked: "1h 45m"
    },
    {
      friend_uuid: "",
      friend_name: "Lauren",
      locked: "",
      formatted_locked: "55m"
    }
  ];


  return (
    <div className="w-full flex flex-col space-y-5 items-center justify-center align-middle bg-app-fg">
      <h1 className="text-2xl text-center font-bold py-3 pb-0">Today's Top Locked Inners 😎</h1>
      {/* option selection container */}
      {leaderboard.length > 0 ? (
        <div className="flex flex-col items-center ">
          <div className="flex justify-center items-end gap-6 h-fit perspective">
            {/* Second Place */}
            <div className="md:text-lg text-sm text-center flex flex-col items-center justify-center align-middle bg-gray-400 text-gray-950 font-bold md:w-24 w-20 rounded-lg p-2 podium-item h-36">
              {leaderboard.length >= 2 ? (
                <div className="h-full flex flex-col items-center justify-center align-middle">
                  <p>{leaderboard[1].friend_name}</p>
                  <span className="text-2xl font-bold">🥈</span>
                  <p className="md:text-sm">{leaderboard[1].formatted_locked}</p>
                </div>
              ) : (
                <span className="text-2xl font-bold">🥈</span>
              )}
            </div>

            {/* First Place (Tallest) */}
            <div className="md:text-lg text-sm text-center flex flex-col items-center justify-center align-middle bg-yellow-400 text-yellow-950 font-bold md:w-28 w-24 rounded-lg p-2 podium-item h-48">
              <p>{leaderboard[0].friend_name}</p>
              <span className="text-2xl font-bold">🥇</span>
              <p className="md:text-sm">{leaderboard[0].formatted_locked}</p>
            </div>

            {/* Third Place */}
            <div className="md:text-lg text-sm text-center bg-orange-400 text-orange-950 flex flex-col items-center justify-center align-middle font-bold md:w-24 w-20 rounded-lg p-2 podium-item h-28">
              {leaderboard.length >= 3 ? (
                <div className="h-full flex flex-col items-center justify-center align-middle">
                  <p>{leaderboard[2].friend_name}</p>
                  <span className="text-2xl font-bold">🥉</span>
                  <p className="md:text-sm">{leaderboard[2].formatted_locked}</p>
                </div>
              ) : (
                <span className="text-2xl font-bold">🥉</span>
              )}
            </div>
          </div>
          {/* all the other people */}
          <div className="mt-5 w-full divide-y divide-app-bg px-2 rounded-xl">
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
      ) : (
        <p className="text-center">Not enough data</p>
      )
      }

    </div>
  )
}
