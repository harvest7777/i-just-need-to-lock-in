"use client";
import { usePendingFriends } from "../_hooks/usePendingFriends"
export default function PendingFriends() {
    const {pendingFriends} = usePendingFriends();
    return(
        <>
        <h1>pending friend requests</h1>
        {pendingFriends.length == 0? (
            <h1>no friends</h1>
        ): (pendingFriends.map((friend, index)=> (
            <div key={index}>
                <p>{friend.name}</p>
            </div>
        )))}
        </>
    )
}