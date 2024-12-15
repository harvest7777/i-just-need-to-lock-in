"use client";
import { AddFriend } from "../_services/AddFriend";
import { useForm } from "react-hook-form";
import { useState } from "react";

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
            <input
            id="friendUUID"
            type="text"
            placeholder="your friend's UUID"
            {...register("friendUUID", { required: "Need UUID!" })}  // Register input field with validation
            />
            <button type="submit">send friend req</button>
            {errors.friendUUID && <p className="text-red-500">must have uuid</p>}
        </form>
        {sendFriendError? (<p className="text-red-500">no cap that shi didnt work</p>): ('')}
        </>
    )
}