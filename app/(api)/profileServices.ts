import { supabase } from "@/utils/supabase/supabase";

export const getNameFromUUID = async(uuid: string): Promise<string> => {
    const{data, error} = await supabase
    .from("profiles")
    .select("name")
    .eq("user_id", uuid)
    .single();
    if(error) throw(error);
    return data? data.name: "";
}

export const getProfilesByUsername = async(name: string): Promise<Profile[]> => {
  const {data, error} = await supabase
  .from("profiles")
  .select("*")
  .ilike("name", `%${name}%`)
  if(error) throw error;
  return data as Profile[]; 
}
