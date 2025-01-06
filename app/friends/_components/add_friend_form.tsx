"use client";
import { AddFriend } from "../_services/AddFriend";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

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
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex space-x-1">
            <input
            id="friendUUID"
            type="text"
            placeholder="friend user id"
            {...register("friendUUID", { required: "Need a valid user id!" })}  // Register input field with validation
            className="rounded-lg bg-appFg w-5/6"
            />
            <button type="submit" className="bg-emerald-600 rounded-lg w-1/6 text-white btn-hover flex items-center justify-center" ><FaPlus/></button>
            </div>
            {errors.friendUUID && <p className="text-red-500">{errors.friendUUID.message}</p>}
        </form>
        {sendFriendError? (<p className="text-red-500">no cap that shi didnt work</p>): ('')}
        </>
    )
}