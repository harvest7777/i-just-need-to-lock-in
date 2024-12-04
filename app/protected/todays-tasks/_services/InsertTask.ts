import { createClient } from "@/utils/supabase/client";

export const insertCompletedTask = async (taskName: string, isComplete: boolean, taskMinutes?: number) => {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;

    // Create the object to insert with required fields
    const taskData: { user_id: string | undefined, name: string, minutes_spent?: number, is_complete: boolean } = {
        user_id: userId,
        name: taskName,
        is_complete: isComplete,
    };

    // Only include taskMinutes if it's provided
    if (taskMinutes !== undefined) {
        taskData.minutes_spent = taskMinutes;
    }

    // Insert into the "tasks" table
    const { data, error } = await supabase.from("tasks").insert([taskData]);

    if (error) {
        console.error("Error inserting task:", error);
        throw error;
    }

    return data;
};
