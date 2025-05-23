"use client";

import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import { FaMagnifyingGlass } from "react-icons/fa6";

import { getProfilesByUsername } from "@/app/(api)/profileServices";
import { addFriend } from "@/app/(api)/friendServices";
import { supabase } from "@/utils/supabase/supabase";

interface FormData {
  friendName: string;
}
interface SearchFriendFormProps {
  acceptedFriends: Friend[] | null;
  sentFriends: Friend[];
  setSentFriends: Dispatch<SetStateAction<Friend[]>>;
}

export default function SearchFriendForm({ acceptedFriends, sentFriends, setSentFriends }: SearchFriendFormProps) {
  const { register, reset, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [noResult, setNoresult] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [userId, setUserId] = useState<string>();
  const getUserId = async () => {
    const id = (await supabase.auth.getUser()).data.user?.id;
    if (id) setUserId(id);
  }
  const onSubmit = async (data: FormData) => {
    let fetchedProfiles;
    fetchedProfiles = await getProfilesByUsername(data.friendName);
    fetchedProfiles = fetchedProfiles.filter((profile) => profile.user_id != userId && !acceptedFriends!.some((friend) => friend.user_id == profile.user_id));

    setProfiles(fetchedProfiles);
    if (fetchedProfiles.length == 0) {
      console.log("no results found")
      setNoresult(true);
    }
    else setNoresult(false);
    reset();
  }
  const handleAdd = async (profile: Profile) => {
    const newlyAddedFriend: Friend | null = await addFriend(profile.user_id);
    console.log("from search", newlyAddedFriend)
    if (newlyAddedFriend === null) return;
    setSentFriends((prev) => [...prev, newlyAddedFriend])
  }
  useEffect(() => {
    getUserId();
  }, [])
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-1 w-full" >
          <input
            id="friendName"
            type="text"
            placeholder="search a username!"
            {...register("friendName", { required: "Need a name!" })}
            className="rounded-xl bg-app-fg w-4/5 pl-2 focus:outline-hidden h-10"
          />
          <button type="submit" className="p-2 h-10 w-1/5 flex justify-center items-center text-app-fg btn-hover bg-app-highlight rounded-xl" ><FaMagnifyingGlass className="text-2xl" /></button>
        </div>
        {errors.friendName && <p className="text-red-500 pl-2">{errors.friendName.message}</p>}
      </form>
      <div className="divide-y divide-gray-700 px-2 rounded-xl bg-app-fg mt-4">
        {profiles.length > 0 &&
          profiles.map((profile) => {
            const isSent = sentFriends.some((friend) => friend.user_id === profile.user_id);
            return (
              <div className="flex items-center justify-between" key={profile.user_id}>
                <div className="w-4/5 rounded-xl p-1">
                  <p >{profile.name}</p>
                  <p className="italic text-app-bg text-sm">{profile.user_id}</p>
                </div>
                <div className="w-1/5">
                  {isSent ? (
                    <p className="h-8 flex justify-center items-center text-center bg-app-bg rounded-xl">Sent</p>
                  ) : (
                    <p onClick={() => handleAdd(profile)} className="h-8 btn-hover flex justify-center items-center text-center bg-app-highlight rounded-xl text-app-fg">Add</p>
                  )}
                </div>
              </div>
            )
          })}

        {noResult && <p className="text-center p-2" >No results found</p>}
      </div>
    </div>
  )
}
