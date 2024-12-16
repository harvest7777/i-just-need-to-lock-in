"use client";
import { useAcceptedFriends } from "../_hooks/useAcceptedFriends";
import { usePendingFriends } from "../_hooks/usePendingFriends"
import { AcceptFriend } from "../_services/AddFriend";
export default function PendingFriends() {
    const {pendingFriends, setPendingFriends} = usePendingFriends();
    const {acceptedFriends, setAcceptedFriends} = useAcceptedFriends();

    const handleAccept = async (friendUUID: string) => {
        await AcceptFriend(friendUUID);
        const acceptedFriend = pendingFriends.find(friend =>friend.user_id===friendUUID);
        if(acceptedFriend)
        {
            setAcceptedFriends((prev)=>[...prev, acceptedFriend])
            setPendingFriends((prev)=> prev.filter(friend=>friend.user_id!==friendUUID))
        }
    }
    return(
        <>
        <h1>pending friend requests</h1>
        {pendingFriends.length == 0? (
            <h1>no pending friends</h1>
        ): (pendingFriends.map((friend)=> (
            <div className="flex" key={friend.user_id}>
                <p>{friend.name}</p>
                <button onClick={async () => handleAccept(friend.user_id)}>ACCEPT</button>
            </div>
        )))}

        {acceptedFriends.length == 0 ? (
            <h1>u got no accepted friends</h1>
        ) : (acceptedFriends.map((friend)=> (
            <div key={friend.user_id}>
                <p>{friend.name}</p>
            </div>
        )))}
        </>
    )
}