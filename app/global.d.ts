import type { Database as DB } from "@/lib/database.types";

declare global {
  type Database = DB;
  type Task = DB["public"]["Tables"]["tasks"]["Row"];
  type TaskInterval = DB["public"]["Tables"]["task_intervals"]["Row"];
  type Group = DB["public"]["Tables"]["groups"]["Row"];

  interface Friend {
    user_id: string;
    name: string;
    is_accepted: boolean;
    created: string;
  }

  interface Profile {
    user_id: string;
    name: string;
  }

}
