"use client";

import { supabase } from "@/utils/supabase/supabase";
import { signOutAction } from "@/app/actions";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoCheckmarkOutline } from "react-icons/io5";
import PreLoaderSmall from "@/app/_components/PreLoaderSmall";
interface FormData {
  newName: string;
}
export default function ManageProfile() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });
  const [editingUsername, setEditingUsername] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { register, reset, handleSubmit } = useForm<FormData>();

  const initialize = async () => {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (userId == null) throw new Error("Error getting user ID!");
    const { data, error } = await supabase
      .from("profiles")
      .select("name")
      .eq("user_id", userId);

    if (error) console.log(error);
    const userEmail = (await supabase.auth.getUser()).data.user?.email;
    if (data && userEmail)
      setUserData({ ...userData, username: data[0].name, email: userEmail });
    setLoading(false);
  };

  const onSubmit = async (data: FormData) => {
    if (!data.newName.trim()) {
      reset();
      setEditingUsername(false);
      return;
    }
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (userId == null) throw new Error("Error getting user ID!");
    await supabase
      .from("profiles")
      .update({ name: data.newName })
      .eq("user_id", userId);

    setUserData({ ...userData, username: data.newName });

    setEditingUsername(false);
    reset();
  };
  useEffect(() => {
    initialize();
  }, []);

  if (loading) {
    return (
      <div className="bg-app-fg rounded-2xl p-2 md:w-2/3 w-full">
        <PreLoaderSmall />
      </div>
    );
  }

  return (
    <div className="bg-app-fg rounded-2xl p-2 md:w-2/3 w-full flex flex-col space-y-4 mt-5">
      <h1 className="text-center text-app-highlight font-bold text-3xl">
        Profile
      </h1>
      {/* username container */}
      <div className="flex gap-x-2 px-2">
        <p className="w-1/3">username</p>
        <div className="flex flex-1 bg-app-bg rounded-xl justify-between">
          {editingUsername ? (
            <form
              onSubmit={handleSubmit((data) => onSubmit(data))}
              className="w-full"
            >
              <input
                id="newName"
                placeholder={userData.username}
                {...register("newName")}
                className="w-full pl-2 bg-app-bg focus:outline-hidden rounded-xl"
              />
            </form>
          ) : (
            <p className="pl-2">{userData.username}</p>
          )}
        </div>
        {editingUsername ? (
          <IoCheckmarkOutline
            onClick={handleSubmit((data) => onSubmit(data))}
            className="text-2xl btn-hover flex-none"
          />
        ) : (
          <MdOutlineDriveFileRenameOutline
            onClick={() => {
              setEditingUsername(true);
            }}
            className="text-2xl btn-hover flex-none"
          />
        )}
      </div>
      {/* email container */}
      <div className="flex gap-x-2 px-2">
        <p className="w-1/3">email</p>
        <p className="w-2/3 bg-app-bg rounded-xl pl-2">{userData.email}</p>
      </div>
      <div className="flex md:flex-row md:justify-between flex-col items-center align-middle justify-center mt-5">
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        <Link href="/tos" className="underline">
          Terms Of Service
        </Link>
        <button onClick={() => signOutAction()} className="underline">
          Sign out
        </button>
      </div>
    </div>
  );
}
