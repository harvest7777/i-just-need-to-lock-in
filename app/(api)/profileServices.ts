import { supabase } from "@/utils/supabase/supabase";

export const getNameFromUUID = async (uuid: string): Promise<string> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("name")
    .eq("user_id", uuid)
    .single();
  if (error) throw (error);
  return data ? data.name : "";
}

export const getProfilesByUsername = async (name: string): Promise<Profile[]> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .ilike("name", `%${name}%`)
  if (error) throw error;
  return data as Profile[];
}

export const getUserId = async (): Promise<string> => {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (userId == null) throw new Error("Error getting user id!");
  return userId;
}

export const updateLastActive = async () => {
  const now = new Date().toISOString();
  const uuid = await getUserId();
  const { error } = await supabase
    .from("profiles")
    .update({ last_active: now })
    .eq("user_id", uuid)
  if (error) throw error;
}

export const updateLogin = async () => {
  const now = new Date().toISOString();
  const uuid = await getUserId();
  const { error } = await supabase
    .from("profiles")
    .update({ last_login: now })
    .eq("user_id", uuid)
  if (error) throw error;
}

export const getStreak = async ():Promise<number> => {
  const uuid = await getUserId();
  const {data, error } = await supabase.from("profiles").select("streak").eq("user_id", uuid).single();
  if (error) throw error;
  return data.streak;
}

export const getLastLogin = async (): Promise<Date|null> => {
  const uuid = await getUserId();
  const { data, error } = await supabase
    .from("profiles")
    .select("last_login")
    .eq("user_id", uuid)
    .single();

    if (error) throw error;

    if(data.last_login==null) return null;
    const utcDate = new Date(data.last_login);
    return utcDate;
};
