"use client";
import { useEffect } from "react"
import { useAcceptedFriends } from "../_hooks/useAcceptedFriends";
import { Task } from "@/app/lockin/_services/TaskSchema";
import { FetchFriendDailyTasks, getFriendTaskIntervals } from "../_services/FetchFriends"
import { TaskInterval } from "@/app/lockin/_services/TaskInterval";
import { useState } from "react";
import { Friend } from "../_services/FriendSchema";
import TimeGraph from "@/app/lockin/_components/time_graph";
export default function FriendFeed() { 
    const {acceptedFriends} = useAcceptedFriends();
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
        <div className="w-3/5">
        {friendData.map((data)=> (
            <div key={data.friend.user_id} className="p-2 bg-appFg rounded-2xl">
                <p className="text-2xl ml-5 mb-1">{data.friend.name}</p>
                <TimeGraph dailyTasks={data.friendTasks} taskIntervals={data.intervals}/>
            </div>
        ))}
        </div>
    )
}