// src/types/task.ts
export interface Task {
    task_id: number;
    name: string;
    is_complete: boolean;
    last_start_time?: string | null; // Optional field: timestamp of last start
    seconds_spent: number; // Optional field: track minutes spent
  }
  