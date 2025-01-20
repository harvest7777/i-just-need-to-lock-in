"use client";
import { useAcceptedFriends } from "../_hooks/useAcceptedFriends";
import { FetchFriendDailyTasks, getFriendTaskIntervals } from "../_services/FetchFriends"
import { TaskInterval } from "@/app/lockin/_services/TaskIntervalSchema";
import { useState, useEffect } from "react";
import { Friend } from "../_services/FriendSchema";
import TimeGraph from "@/app/lockin/_components/time_graph";
export default function FriendFeed() { 
    const {acceptedFriends, friendActivity} = useAcceptedFriends();
    const [friendData, setFriendData] = useState<
    { friend: Friend; friendTasks: Task[]; intervals: TaskInterval[] }[]
>([]);
    const initialize = async () => {
        const data = await Promise.all (acceptedFriends.map(async (friend)=> {
            const friendTasks: Task[] = await FetchFriendDailyTasks(friend, "America/Los_Angeles");
            const intervals: TaskInterval[] = await getFriendTaskIntervals(friend,"America/Los_Angeles");
            return {friend, friendTasks, intervals};
        }))
        setFriendData(data);
    }
    useEffect(()=>{
        initialize();
    },[acceptedFriends])

    useEffect(()=>{
        console.log(friendData);
    },[friendData])
    return(
        <div className="w-full flex flex-col items-center">
        {friendData.length > 0? (
        <>
        {friendData.map((data)=> (
            <div key={data.friend.user_id} className="p-2 bg-appFg rounded-2xl mt-10 md:w-3/5 w-full">
                <div className="flex justify-between mb-1">
                <p className="text-2xl ml-5">{data.friend.name}</p>
                <p className="text-2xl italic mr-5">{friendActivity.get(data.friend.user_id)?.last_start_time? `🔒${friendActivity.get(data.friend.user_id)?.name}`: ("Not locked in")}</p>
                </div>
                <TimeGraph dailyTasks={data.friendTasks} taskIntervals={data.intervals}/>
            </div>
        ))}
        </>
        ): (
        <p className="pt-20">No friends to display :(</p>
        )}
        </div>
    )
}