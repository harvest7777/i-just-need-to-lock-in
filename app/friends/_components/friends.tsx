import { useAcceptedFriends } from "../_hooks/useAcceptedFriends";
export default function FriendsList() {
    const {acceptedFriends, friendActivity} = useAcceptedFriends();
    return(
        <div className="w-full p-2 flex flex-col items-center">
            <h1 className="font-bold text-xl pl-2 w-full">Friends</h1>
            {acceptedFriends.length !== 0? (
                acceptedFriends.map((friend) => (
                    <div className="pl-2 w-full rounded-md" key={friend.user_id}>
                        <p className="font-semibold">{friend.name}</p>
                        <p className="italic">{friendActivity.get(friend.user_id)?.last_start_time? `🔒${friendActivity.get(friend.user_id)?.name}`: ("Not locked in")}</p>
                    </div>
                ))
            ):(
                <p className="mt-10 italic">Add friends by clicking the +</p>
            )}
        </div>
    )
}