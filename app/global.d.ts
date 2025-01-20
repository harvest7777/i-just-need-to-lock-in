import type { Database as DB} from "@/lib/database.types";

declare global {
    type Database = DB;
    type Task = DB["public"]["Tables"]["tasks"]["Row"];
    type TaskInterval = DB["public"]["Tables"]["task_intervals"]["Row"];
}