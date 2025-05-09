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

