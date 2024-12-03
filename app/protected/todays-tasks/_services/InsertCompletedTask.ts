import { createClient } from "@/utils/supabase/client";

export const insertCompletedTask = async (taskName: string, taskMinutes: number) => {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;

    const { data, error } = await supabase.from("tasks").insert({
        user_id: userId,
        name: taskName,
        minutes_spent: taskMinutes,
        is_complete: true,
    });

    if (error) {
        console.error("Error inserting task:", error);
        throw error;
    }

    return data;
};
