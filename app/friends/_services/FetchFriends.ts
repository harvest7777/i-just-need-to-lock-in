import { supabase } from "@/utils/supabase/supabase";
import { Friend } from "./FriendSchema";
import { getDayStartEnd } from "@/app/lockin/_services/TaskTimeUtils";
import { Profile } from "@/app/manage-friends/_services/profile_schema";
export const getNameFromUUID = async(uuid: string): Promise<string> => {
    const{data, error} = await supabase
    .from("profiles")
    .select("name")
    .eq("user_id", uuid)
    .single();
    if(error) throw(error);
    return data? data.name: "";
}

export const FetchPendingFriends = async() => {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if(userId==null) {
      throw new Error("Error fetching user id");
    }
    //TO DO FIX THIS SHIT SO IT JST JOINS TABLE INSTEAD OF MAKING EDXTRA API CALLS
    //want to fetch all columns where you aore the recipient and the request has not been accepted
    const{data, error} = await supabase
    .from("friends")
    .select("*")
    .eq("recipient", userId)
    .eq("is_accepted", false);

    if(error) throw(error);
    if(data.length==0) return [];

    const friends: Friend[] = await Promise.all(
        data.map(async (row) => {
          const name = await getNameFromUUID(row.initiator); // Fetch name asynchronously
          return {
            user_id: row.initiator,
            name,
            is_accepted: false,
            created: row.created_at, // Ensure this matches your schema
          };
        })
      );
      
    return friends;
}

export const FetchAcceptedFriends = async () => {
    const user = supabase.auth.getUser();
    const userId = (await user).data.user?.id;

    const{data, error} = await supabase
    .from("friends")
    .select(`
      *,
      recipient_profile:profiles!friends_recipient_fkey(name),
      initiator_profile:profiles!friends_initiator_fkey(name)
      `)
    .eq("is_accepted", true)
    .or(`recipient.eq.${userId},initiator.eq.${userId}`);

    if(error) throw error;
    if(data.length===0) return [];

    const friends: Friend[] = (data.map((row) => {
      // You're creating a new friend. You do not want to create one of yourself
      if(row.recipient_profile == null || row.initiator_profile == null) throw new Error("Error fetching profiles");
      if(row.initiator==userId)
      {
        return {
          user_id: row.recipient,
          name: row.recipient_profile.name,
          is_accepted: true,
          created: row.created_at
        }
      }
      else 
      {
        return {
          user_id: row.initiator,
          name: row.initiator_profile.name,
          is_accepted: true,
          created: row.created_at
        }
      }
    }))
    return friends;
}

export const FetchSentFriends = async () => {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if(userId==null) throw new Error("fetchSentFriends - Error fetching user id");
  const { data, error } = await supabase
  .from("friends")
  .select(`
    recipient,
    created_at,
    profiles!friends_recipient_fkey(name)
  `)
  .eq("initiator", userId)
  .eq("is_accepted", false);

  interface Profile {
    name: string;
  }
  interface dataReturned {
    recipient: string;
    created_at: string;
    profiles: Profile;
  }
  if(error) throw(error);

  const fetched: dataReturned[] = data as unknown as dataReturned[];
  const friends: Friend[]= fetched.map((fetch) => {
    return {
      user_id: fetch.recipient,
      name: fetch.profiles.name,
      created: fetch.created_at,
      is_accepted: false

    }
  })
  return friends;
}

export const FetchFriendDailyTasks = async(friend: Friend, userTimeZone: string): Promise<Task[]> => {
  const{startOfDayUTC, endOfDayUTC} = getDayStartEnd(userTimeZone);
  console.log(friend.name);
  const {data, error} = await supabase
  .from("tasks")
  .select("*")
  .eq("user_id", friend.user_id)
  .gte("created_at", startOfDayUTC)
  .lte("created_at", endOfDayUTC);
  if(error) throw error;
  return data as Task[];
}
export const getFriendTaskIntervals = async(friend: Friend, userTimeZone: string): Promise<TaskInterval[]> => {
    const {startOfDayUTC, endOfDayUTC} = getDayStartEnd(userTimeZone);
    console.log("Friend id", friend.user_id);
    const { data, error } = await supabase
    .from("task_intervals")
    .select(`
      *,
      tasks!inner (user_id)
    `)
    .eq("tasks.user_id", friend.user_id)
    .gte("start_time", startOfDayUTC)
    .lte("end_time", endOfDayUTC);

    if (error) throw error;

    return data as TaskInterval[];
}

export const getFriendActivity = async(friends: Friend[]): Promise<Map<string, Task>> => { 
  let map = new Map();
  await Promise.all( friends.map(async (friend) => {
    const {data,error} = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", friend.user_id)
    .not("last_start_time", "is", null);
    if(error) throw error;

    if(data && data.length >0)map.set(friend.user_id,data[0]);
  }));
  return map;
}

export const getFriendsByUsername = async(name: string): Promise<Profile[]> => {
  const {data, error} = await supabase
  .from("profiles")
  .select("*")
  .ilike("name", `%${name}%`)
  if(error) throw error;
  return data as Profile[]; 
}