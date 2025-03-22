"use client";

import { Dispatch, SetStateAction } from "react";

import { deleteFriend } from "@/app/(api)/friendServices";

interface ConfirmRemoveFriendModalProps {
    friendToRemove: Friend|null;
    setFriendToRemove: Dispatch<SetStateAction<Friend|null>>;
    setAcceptedFriends: Dispatch<SetStateAction<Friend[]>>;
}
const  ConfirmRemoveFriendModal: React.FC<ConfirmRemoveFriendModalProps> = ({friendToRemove, setFriendToRemove, setAcceptedFriends}) => {
    const handleConfirmDelete = async() => {
        if(friendToRemove==null) return;
        await deleteFriend(friendToRemove.user_id);
        setAcceptedFriends((prev)=>prev.filter(friend=>friend.user_id!=friendToRemove.user_id));
        setFriendToRemove(null);

    }
    const handleCancel = () => {
        setFriendToRemove(null);
    }
    return (
        (friendToRemove) &&
        <div className="fixed top-0 left-0 w-full min-h-full flex justify-center md:items-start items-center z-50">
            {/* Background Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="relative md:w-3/5 w-11/12 bg-app-fg p-3 rounded-xl h-fit md:mt-28 text-xl flex flex-col justify-center items-center">
                <div className="mt-3 text-center">
                    <span>Are you sure you want to remove </span>
                    <span className="px-2 bg-app-bg rounded-xl">{friendToRemove.name}</span>
                    <span> as a friend?</span>
                </div>
                
                <div className="mt-3 text-center">
                    <span>You will lose access to their task status unless they accept you as friend again. This action can not be undone.</span>
                </div>
                <div className="flex justify-center items-center align-middle space-x-8">
                    <p onClick={()=>handleConfirmDelete()} className="mt-3 p-2 text-center text-app-fg rounded-xl font-bold bg-red-600 w-fit btn-hover">Delete</p>
                    <p onClick={()=>handleCancel()} className="mt-3 p-2 text-center text-app-fg rounded-xl font-bold bg-neutral-400 w-fit btn-hover">Cancel</p>
                </div>
            </div>
        </div>

    );
}

export default ConfirmRemoveFriendModal;

