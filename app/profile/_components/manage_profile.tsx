"use client";

import { supabase } from "@/utils/supabase/supabase";
import { useState, useEffect } from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoCheckmarkOutline } from "react-icons/io5";
import Link from "next/link";
import { useForm } from "react-hook-form";
interface FormData {
    newName: string;
}
export default function ManageProfile () {
    const [userData, setUserData] = useState({
        username:"silly goose",
        email:"sillygoose@gmail.com"
    })
    const [editingUsername, setEditingUsername] = useState<boolean>(false);
    const {register, reset, handleSubmit} = useForm<FormData>();

    const initialize = async () => {
        const userId = (await supabase.auth.getUser()).data.user?.id;
        if(userId==null) throw new Error("Error getting user ID!");
        const {data, error} = await supabase
        .from("profiles")
        .select("name")
        .eq("user_id",userId);

        if(error) console.log(error);
        const userEmail = (await supabase.auth.getUser()).data.user?.email;
        if(data && userEmail) setUserData({...userData, username: data[0].name, email: userEmail});
    }

    const onSubmit = async (data: FormData) => {
        if(!data.newName.trim()) {
            reset();
            setEditingUsername(false);
            return;
        }
        const userId = (await supabase.auth.getUser()).data.user?.id;
        if(userId==null) throw new Error("Error getting user ID!");
        await supabase
        .from("profiles")
        .update({"name": data.newName})
        .eq("user_id", userId);

        setUserData({...userData, username:data.newName});
        
        setEditingUsername(false);
        reset();
    }
    useEffect(()=>{
        initialize();
    },[])

    return(
        <div className="bg-appFg rounded-2xl p-2 lg:w-1/3 md:w-2/3 w-full flex flex-col space-y-4 pb-10">
            <h1 className="text-center text-emerald-600 font-bold text-3xl">Profile</h1>
            {/* username container */}
            <div className="flex">
                <p className="w-1/3">username</p>
                <div className="flex w-1/2 bg-appBg rounded-xl justify-between">
                    {editingUsername? (
                        <form onSubmit={handleSubmit((data)=>onSubmit(data))}  className="w-full">
                            <input
                            id="newName"
                            placeholder={userData.username}
                            {...register("newName")}
                            className="w-full pl-2 bg-appBg focus:outline-none rounded-xl"
                            />
                        </form>
                    ): (
                        <p className="pl-2">{userData.username}</p>
                    )}
                    </div>
                    {editingUsername? (
                        <IoCheckmarkOutline onClick={handleSubmit((data)=>onSubmit(data))} className="text-2xl btn-hover w-1/6"/>
                    ):(
                        <MdOutlineDriveFileRenameOutline onClick={()=>{setEditingUsername(true)}} className="text-2xl btn-hover w-1/6"/>
                    )}
            </div>
            {/* email container */}
            <div className="flex">
                <p className="w-1/3">email</p>
                <p className="w-2/3 bg-appBg rounded-xl pl-2">{userData.email}</p>
            </div>
            <div className="flex">
                <p className="w-1/3">password</p>
                <Link href="/reset-password"  className="w-2/3 bg-emerald-600 text-appFg rounded-xl text-center btn-hover">Reset password</Link>
            </div>
        </div>
    )
}