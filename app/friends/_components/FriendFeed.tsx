"use client";
import { useAcceptedFriends } from "../_hooks/useAcceptedFriends";
import { getFriendTaskIntervals } from "../_services/FetchFriends"
import { useState, useEffect } from "react";
import { Friend } from "../_services/FriendSchema";
import TimeGraph from "@/app/lockin/_components/TimeGraph";
export default function FriendFeed() { 
    const {acceptedFriends, friendActivity} = useAcceptedFriends();
    const [friendData, setFriendData] = useState<
    { totalSeconds: number; friend: Friend;  intervals: TaskInterval[] }[]
>([]);
    const initialize = async () => {
        const data = await Promise.all (acceptedFriends.map(async (friend)=> {
            const intervals: TaskInterval[] = await getFriendTaskIntervals(friend);
            let totalSeconds=0;
            intervals.forEach((interval) => {
                const startLocal = new Date(interval.start_time);
                const endLocal = new Date(interval.end_time);

                const diffSeconds = Math.floor((endLocal.getTime() - startLocal.getTime())/1000);
                totalSeconds+=diffSeconds;
        })

            return {totalSeconds, friend, intervals};
        }))
        setFriendData(data);
    }
    useEffect(()=>{
        initialize();
    },[acceptedFriends])

    return(
        <div className="w-full flex flex-col items-center">
        <h1 className="text-center text-emerald-600 font-bold text-3xl mt-5 bg-appFg p-2 px-4 rounded-2xl">Friend Feed</h1>
        {friendData.length > 0? (
        <>
        {friendData
        .slice()
        .sort((a,b) => b.totalSeconds - a.totalSeconds)
        .map((data)=> (
            <div key={data.friend.user_id} className="p-2 bg-appFg rounded-2xl mt-5 md:w-3/5 w-full">
                <div className="flex justify-between mb-1">
                <p className="text-2xl ml-5">{data.friend.name}</p>
                <p className="text-2xl italic mr-5">{friendActivity.get(data.friend.user_id)?.last_start_time? `🔒${friendActivity.get(data.friend.user_id)?.name}`: ("Unlocked")}</p>
                </div>
                <TimeGraph taskIntervals={data.intervals}/>
            </div>
        ))}
        </>
        ): (
        <p className="pt-20">No friends to display :(</p>
        )}
        </div>
    )
}