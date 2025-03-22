"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { addFriend } from "@/app/(api)/friendServices";

interface FormData {
    friendUUID: string;
}
export default function AddFriendForm() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
    const [sendFriendError, setSendFriendError] = useState(false);
    const onSubmit = async(data: FormData) => {
        try{
            await addFriend(data.friendUUID);
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
            placeholder="friend UUID"
            {...register("friendUUID", { required: "Need a valid user id!" })}  // Register input field with validation
            className="rounded-xl bg-app-fg w-4/5 pl-2 focus:outline-hidden"
            />
            <button type="submit" className="w-1/5 text-center bg-app-highlight p-1 btn-hover text-app-fg rounded-xl h-8" >Add</button>
            </div>
            {errors.friendUUID && <p className="pl-2 text-red-500">{errors.friendUUID.message}</p>}
        </form>
        {sendFriendError? (<p className="text-red-500">Error adding friend</p>): ('')}
        </div>
    )
}
