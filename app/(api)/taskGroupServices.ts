import { supabase } from "@/utils/supabase/supabase";
import { getUserId } from "./profileServices";

export const getGroups = async():Promise<Group[]> => {
    const {data, error} = await supabase
    .from("groups")
    .select("*")

    if(error) throw error;

    if(data==null || data.length==0) return [];
    return data as Group[];

}
export const insertGroup = async (groupName: string): Promise<Group> => {
    const userId = await getUserId();
    console.log(userId);
    const {data, error} = await supabase
    .from("groups")
    .insert({
        user_id: userId,
        name: groupName 
    })
    .select("*")
    .single();
    if(error) throw error;
    return data as Group;
}

export const deleteGroup = async (group: Group): Promise<Group> => {
    const {data, error} = await supabase
    .from("groups")
    .delete()
    .eq("id", group.id)
    .select("*")
    .single();

    if(error) throw error;
    if(data==null) throw new Error("Couldn't get deleted group!")
    
    return data as Group;
}

export const renameGroup = async (group: Group, newGroupName: string): Promise<Group> => {
    const {data, error} = await supabase
    .from("groups")
    .update({name: newGroupName})
    .eq("id", group.id)
    .select("*")
    .single();
    
    if(error) throw error;

    return data as Group;
}