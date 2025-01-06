import AddFriendForm from "./_components/add_friend_form"
import PendingFriends from "./_components/pending_friends"
import FriendFeed from "./_components/friend_feed"
export default function FriendsPage() {
    return(
        <>
        <h1>Locking in is better with friends. Lets add some!</h1>
        <AddFriendForm/>
        <PendingFriends/>
        <FriendFeed/>
        </>
    )
}