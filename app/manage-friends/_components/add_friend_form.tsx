"use client";
import { AddFriend } from "../../friends/_services/AddFriend";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
interface FormData {
    friendUUID: string;
}
export default function AddFriendForm() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
    const [sendFriendError, setSendFriendError] = useState(false);
    const onSubmit = async(data: FormData) => {
        try{
            await AddFriend(data.friendUUID);
            setSendFriendError(false);
        } catch(error)
        {
            console.log(error);
            setSendFriendError(true);

        }
        reset();
    }

    return(
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex space-x-1 w-full" >
            <input
            id="friendUUID"
            type="text"
            placeholder="friend id"
            {...register("friendUUID", { required: "Need a valid user id!" })}  // Register input field with validation
            className="rounded-xl bg-appFg w-4/5 pl-2"
            />
            <button type="submit" className="w-1/5 flex items-center align-middle justify-center btn-hover bg-appFg rounded-xl" >Add</button>
            </div>
            {errors.friendUUID && <p className="pl-2 text-red-500">{errors.friendUUID.message}</p>}
        </form>
        {sendFriendError? (<p className="text-red-500">Error adding friend</p>): ('')}
        </div>
    )
}