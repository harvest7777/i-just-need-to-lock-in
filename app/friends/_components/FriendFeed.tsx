"use client";
import { useState, useEffect } from "react";

import BarGraph from "@/app/stats/_components/BarGraph";

import { useAcceptedFriends } from "../_hooks/useAcceptedFriends";
import { getFriendTaskIntervals } from "@/app/(api)/friendServices";
import { getPastTaskTime } from "@/app/(api)/taskTimeServices";
import { TPastTaskTime } from "@/app/(api)/taskTimeServices";
import DisplayTimeSpent from "@/app/stats/_components/DisplayTimeSpent";

export default function FriendFeed() {
  const { acceptedFriends, friendActivity } = useAcceptedFriends();
  // storing an array of friend data which i will use sort by totalseconds
  const [friendData, setFriendData] = useState<
    {
      totalSeconds: number;
      friend: Friend;
      intervals: TaskInterval[];
      timeSpent: TPastTaskTime[];
    }[]
  >([]);
  const initialize = async () => {
    const data = await Promise.all(
      acceptedFriends!.map(async (friend) => {
        const intervals: TaskInterval[] = await getFriendTaskIntervals(friend);
        let totalSeconds = 0;

        intervals.forEach((interval) => {
          const startLocal = new Date(interval.start_time);
          const endLocal = new Date(interval.end_time);

          const diffSeconds = Math.floor(
            (endLocal.getTime() - startLocal.getTime()) / 1000
          );
          totalSeconds += diffSeconds;
        });
        const timeSpent: TPastTaskTime[] = await getPastTaskTime(
          0,
          friend.user_id
        );

        return { totalSeconds, friend, intervals, timeSpent };
      })
    );
    setFriendData(data);
  };
  useEffect(() => {
    if (acceptedFriends !== null) initialize();
  }, [acceptedFriends]);

  return (
    <div className="w-full flex flex-col items-center">
      {friendData.length > 0 ? (
        <>
          {friendData
            .slice()
            .sort((a, b) => b.totalSeconds - a.totalSeconds)
            .map((data) => (
              <div
                key={data.friend.user_id}
                className="p-2 bg-app-fg mt-5 md:w-3/5 w-full card-outline "
              >
                <div className="flex justify-between text-app-text pt-1">
                  <p className="md:text-2xl text-xl ml-5">{data.friend.name}</p>
                  <p className="text-2xl italic mr-5">
                    {friendActivity.get(data.friend.user_id)?.last_start_time &&
                      `🔒${friendActivity.get(data.friend.user_id)?.name}`}
                  </p>
                </div>
                <div className="pt-3">
                  <BarGraph taskIntervals={data.intervals} />
                  <DisplayTimeSpent tasks={data.timeSpent} />
                </div>
              </div>
            ))}
        </>
      ) : (
        <p className="pt-20">No friends to display :(</p>
      )}
    </div>
  );
}
