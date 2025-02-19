"use client";

import { Dispatch, SetStateAction } from "react";

interface ConfirmDeleteModalProps {
    groupToDelete:Group|null;
    setGroupToDelete: Dispatch<SetStateAction<Group|null>>;
    handleDeleteGroup:(group: Group) => void;
}
const  ConfirmDeleteGroupModal: React.FC<ConfirmDeleteModalProps> = ({groupToDelete, setGroupToDelete, handleDeleteGroup}) => {
    const handleConfirmDelete = () => {
        if(groupToDelete==null) return;
        handleDeleteGroup(groupToDelete);
        setGroupToDelete(null);
    }
    const handleCancel = () => {
        setGroupToDelete(null);
    }
    return (
        (groupToDelete) &&
        <div className="fixed top-0 left-0 w-full min-h-full flex justify-center md:items-start items-center z-50">
            {/* Background Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="card-outline relative md:w-3/5 w-11/12 bg-appFg p-3 rounded-xl h-fit md:mt-28 text-xl flex flex-col justify-center items-center">
                <div className="mt-3">
                    <span>Are you sure you want to delete the group </span>
                    <span className="px-2 bg-appBg rounded-xl">{groupToDelete.name}</span>
                    <span>?</span>
                </div>
                
                <div className="mt-3 text-center">
                    <span>All tasks associated with this group will be moved out.</span>
                </div>
                <div className="flex justify-center items-center align-middle space-x-8">
                    <p onClick={()=>handleConfirmDelete()} className="mt-3 p-2 text-center text-appFg rounded-xl font-bold bg-red-600 w-fit btn-hover">Delete</p>
                    <p onClick={()=>handleCancel()} className="mt-3 p-2 text-center text-appFg rounded-xl font-bold bg-neutral-400 w-fit btn-hover">Cancel</p>
                </div>
            </div>
        </div>

    );
}

export default ConfirmDeleteGroupModal;
