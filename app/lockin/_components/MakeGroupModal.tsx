"use client";

import { insertGroup } from "@/app/(api)/taskGroupServices";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface MakeGroupModalProps {
    handleMakeGroup:(name:string) => void;
    setGroups: Dispatch<SetStateAction<Group[]>>;
    setVisible: Dispatch<SetStateAction<boolean>>;
}

interface formData {
    groupName: string;
}
const  MakeGroupModal: React.FC<MakeGroupModalProps> = ({handleMakeGroup, setVisible}) => {
    const {register, handleSubmit,reset, formState: {errors}} = useForm<formData>();

    const onSubmit = async (data: formData) => {
        handleMakeGroup(data.groupName);
        reset();
        setVisible(false);
    }
    
    return (
        <div className="fixed top-0 left-0 w-full min-h-full flex justify-center md:items-start items-center z-50">
            {/* Background Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="card-outline relative md:w-3/5 w-11/12 bg-app-fg p-3  h-fit md:mt-28 text-xl flex flex-col justify-center items-center">
                <h1 className="text-center text-2xl font-bold">Name your new group</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-3 text-center">
                    <input
                    id="groupName"
                    placeholder="cecs323 homework"
                    className="bg-app-bg px-2 rounded-lg"
                    {...register("groupName", {required: "Need a name!"})}/>

                    {errors.groupName && <p className="text-red-500">{errors.groupName.message}</p>}
                    <div className="flex justify-center items-center align-middle space-x-8 mt-3">
                        <button type="submit"  className="p-2 text-center text-app-fg rounded-xl font-bold bg-app-highlight w-fit btn-hover">Create Group!</button>
                        <p onClick={()=>setVisible(false)}  className=" p-2 text-center text-app-fg rounded-xl font-bold bg-neutral-400 w-fit btn-hover">Cancel</p>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default MakeGroupModal;
