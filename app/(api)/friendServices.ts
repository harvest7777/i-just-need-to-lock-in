import { supabase } from "@/utils/supabase/supabase";
import { getNameFromUUID, getUserId } from "@/app/(api)/profileServices";
import { getDayStartEnd } from "@/app/(helpers)/getDayStartEnd";
import { LeaderboardData } from "../manage-friends/_services/leaderboard_schema";

export const addFriend = async (friendUUID: string): Promise<Friend | null> => {
  // This will insert a row where you are the initiator, friendUUID is the recipient
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (userId == null) throw new Error("Error getting user ID!");

  // check if a relationship exists already
  const { data } = await supabase
    .from("friends")
    .select("*")
    .or(`and(initiator.eq.${userId},recipient.eq.${friendUUID}),and(initiator.eq.${friendUUID},recipient.eq.${userId})`);
  if (data?.length !== 0) return null;

  const { data: newFriend } = await supabase
    .from("friends")
    .insert({
      initiator: userId,
      recipient: friendUUID
    })
    .select(`
        created_at,
        recipient,
        profiles!recipient(name)
      `);
  interface Profile {
    name: string;
  }
  interface dataReturned {
    recipient: string;
    created_at: string;
    profiles: Profile;
  }
  if (newFriend == null) return null;
  const fetchedData: dataReturned = newFriend[0] as unknown as dataReturned;
  const sentFriend: Friend = {
    user_id: fetchedData.recipient,
    name: fetchedData.profiles.name,
    is_accepted: false,
    created: fetchedData.created_at
  }
  return sentFriend;

}

export const acceptFriend = async (friendUUID: string) => {

  const { error } = await supabase
    .from("friends")
    .update({ is_accepted: true })
    .eq('initiator', friendUUID);

  if (error) throw error;
}

export const getPendingFriends = async () => {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (userId == null) {
    throw new Error("Error fetching user id");
  }
  //TO DO FIX THIS SHIT SO IT JST JOINS TABLE INSTEAD OF MAKING EDXTRA API CALLS
  //want to fetch all columns where you aore the recipient and the request has not been accepted
  const { data, error } = await supabase
    .from("friends")
    .select("*")
    .eq("recipient", userId)
    .eq("is_accepted", false);

  if (error) throw (error);
  if (data.length == 0) return [];

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

export const getAcceptedFriends = async () => {
  const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;

  const { data, error } = await supabase
    .from("friends")
    .select(`
      *,
      recipient_profile:profiles!friends_recipient_fkey(name, last_active),
      initiator_profile:profiles!friends_initiator_fkey(name, last_active)
      `)
    .eq("is_accepted", true)
    .or(`recipient.eq.${userId},initiator.eq.${userId}`);

  if (error) throw error;
  if (data.length === 0) return [];

  const friends: Friend[] = (data.map((row) => {
    // You're creating a new friend. You do not want to create one of yourself
    if (row.recipient_profile == null || row.initiator_profile == null) throw new Error("Error fetching profiles");
    if (row.initiator == userId) {
      return {
        user_id: row.recipient,
        name: row.recipient_profile.name,
        is_accepted: true,
        created: row.created_at,
        last_active: row.recipient_profile.last_active ? String(row.recipient_profile.last_active) : null
      }
    }
    else {
      return {
        user_id: row.initiator,
        name: row.initiator_profile.name,
        is_accepted: true,
        created: row.created_at,
        last_active: row.initiator_profile.last_active ? String(row.initiator_profile.last_active) : null
      }
    }
  }))
  return friends;
}

export const getSentFriends = async () => {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (userId == null) throw new Error("getSentFriends - Error fetching user id");
  const { data, error } = await supabase
    .from("friends")
    .select(`
    recipient,
    created_at,
    profiles!friends_recipient_fkey(name, last_active)
  `)
    .eq("initiator", userId)
    .eq("is_accepted", false);

  interface Profile {
    name: string;
    last_active: string | null;
  }
  interface dataReturned {
    recipient: string;
    created_at: string;
    profiles: Profile;
  }
  if (error) throw (error);

  const fetched: dataReturned[] = data as unknown as dataReturned[];
  const friends: Friend[] = fetched.map((fetch) => {
    return {
      user_id: fetch.recipient,
      name: fetch.profiles.name,
      created: fetch.created_at,
      is_accepted: false,
      last_active: fetch.profiles.last_active ? String(fetch.profiles.last_active) : null
    }
  })
  return friends;
}

export const getFriendToDos = async (friend: Friend): Promise<Task[]> => {
  const { startOfDayUTC, endOfDayUTC } = getDayStartEnd();
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", friend.user_id)
    .gte("created_at", startOfDayUTC)
    .lte("created_at", endOfDayUTC);
  if (error) throw error;
  return data as Task[];
}

export const getFriendTaskIntervals = async (friend: Friend): Promise<TaskInterval[]> => {
  const { startOfDayUTC, endOfDayUTC } = getDayStartEnd();
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

export const deleteFriend = async (friendUUID: string) => {
  const { error } = await supabase
    .from("friends")
    .delete()
    .or(`recipient.eq.${friendUUID},initiator.eq.${friendUUID}`)
    .select();

  if (error) throw error;
}

export const getMostLockedInFriends = async (time: string): Promise<LeaderboardData[]> => {
  const userId = await getUserId();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const { data, error } = await supabase.rpc('get_leaderboards', { user_uuid: userId, timespan: time, user_timezone: timezone });
  if (error) throw error;
  return data as LeaderboardData[];

}
