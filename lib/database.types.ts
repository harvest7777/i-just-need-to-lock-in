export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      friends: {
        Row: {
          created_at: string
          id: number
          initiator: string
          is_accepted: boolean
          recipient: string
        }
        Insert: {
          created_at?: string
          id?: number
          initiator: string
          is_accepted?: boolean
          recipient: string
        }
        Update: {
          created_at?: string
          id?: number
          initiator?: string
          is_accepted?: boolean
          recipient?: string
        }
        Relationships: [
          {
            foreignKeyName: "friends_initiator_fkey"
            columns: ["initiator"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "friends_recipient_fkey"
            columns: ["recipient"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      groups: {
        Row: {
          id: number
          name: string
          user_id: string
        }
        Insert: {
          id?: number
          name: string
          user_id: string
        }
        Update: {
          id?: number
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          day_end: string | null
          day_start: string | null
          name: string
          user_id: string
        }
        Insert: {
          day_end?: string | null
          day_start?: string | null
          name?: string
          user_id: string
        }
        Update: {
          day_end?: string | null
          day_start?: string | null
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      task_intervals: {
        Row: {
          end_time: string
          id: number
          start_time: string
          task_id: number
        }
        Insert: {
          end_time: string
          id?: number
          start_time: string
          task_id: number
        }
        Update: {
          end_time?: string
          id?: number
          start_time?: string
          task_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "task_intervals_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["task_id"]
          },
        ]
      }
      tasks: {
        Row: {
          completed_at: string | null
          created_at: string
          group_id: number | null
          is_complete: boolean
          last_start_time: string | null
          name: string
          seconds_spent: number
          task_id: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          group_id?: number | null
          is_complete?: boolean
          last_start_time?: string | null
          name?: string
          seconds_spent?: number
          task_id?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          group_id?: number | null
          is_complete?: boolean
          last_start_time?: string | null
          name?: string
          seconds_spent?: number
          task_id?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_task_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "tasks_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      friendship_exists: {
        Args: {
          user_id: string
          friend_id: string
        }
        Returns: boolean
      }
      get_last_active: {
        Args: { user_uuid: string }
        Returns: {
          friend_uuid: string
          last_active: string
          task_name: string
        }[]
      }
      get_leaderboards: {
        Args: { user_uuid: string; timespan: string; user_timezone: string }
        Returns: {
          friend_uuid: string
          friend_name: string
          locked: unknown
          formatted_locked: string
        }[]
      }
      get_pie_chart: {
        Args: { user_timezone: string; cur_uuid: string }
        Returns: {
          group_id: number
          group_name: string
          total_time: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
