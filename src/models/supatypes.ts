export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      budgets: {
        Row: {
          amount: number
          created_at: string
          deleted_at: string | null
          ended_at: string | null
          id: string
          name: string
          plan_id: string
          started_at: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          deleted_at?: string | null
          ended_at?: string | null
          id: string
          name: string
          plan_id: string
          started_at?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          deleted_at?: string | null
          ended_at?: string | null
          id?: string
          name?: string
          plan_id?: string
          started_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "budgets_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          name: string
          parent_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id: string
          name: string
          parent_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          balance: number
          created_at: string
          deleted_at: string | null
          id: string
          name: string
          plan_id: string
          target: number
          updated_at: string
        }
        Insert: {
          balance?: number
          created_at?: string
          deleted_at?: string | null
          id: string
          name: string
          plan_id: string
          target: number
          updated_at?: string
        }
        Update: {
          balance?: number
          created_at?: string
          deleted_at?: string | null
          id?: string
          name?: string
          plan_id?: string
          target?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "goals_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      plan_access: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          invited_at: string | null
          plan_id: string
          role: Database["public"]["Enums"]["role_enum"]
          status: Database["public"]["Enums"]["status_enum"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id: string
          invited_at?: string | null
          plan_id: string
          role: Database["public"]["Enums"]["role_enum"]
          status: Database["public"]["Enums"]["status_enum"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          invited_at?: string | null
          plan_id?: string
          role?: Database["public"]["Enums"]["role_enum"]
          status?: Database["public"]["Enums"]["status_enum"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plan_access_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plan_access_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          name: string
          owner_id: string
          status: Database["public"]["Enums"]["status_enum"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id: string
          name: string
          owner_id: string
          status: Database["public"]["Enums"]["status_enum"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string
          owner_id?: string
          status?: Database["public"]["Enums"]["status_enum"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "plans_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      transaction_details: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          key: string
          transaction_id: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id: string
          key: string
          transaction_id: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          key?: string
          transaction_id?: string
          updated_at?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "transaction_details_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          budget_id: string | null
          category_id: string
          created_at: string
          deleted_at: string | null
          effective_date: string
          goal_id: string | null
          id: string
          notes: string | null
          plan_id: string
          status: Database["public"]["Enums"]["transaction_status_enum"]
          transaction_date: string
          updated_at: string
          wallet_id: string
        }
        Insert: {
          amount: number
          budget_id?: string | null
          category_id: string
          created_at?: string
          deleted_at?: string | null
          effective_date: string
          goal_id?: string | null
          id: string
          notes?: string | null
          plan_id: string
          status: Database["public"]["Enums"]["transaction_status_enum"]
          transaction_date: string
          updated_at?: string
          wallet_id: string
        }
        Update: {
          amount?: number
          budget_id?: string | null
          category_id?: string
          created_at?: string
          deleted_at?: string | null
          effective_date?: string
          goal_id?: string | null
          id?: string
          notes?: string | null
          plan_id?: string
          status?: Database["public"]["Enums"]["transaction_status_enum"]
          transaction_date?: string
          updated_at?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_budget_id_fkey"
            columns: ["budget_id"]
            isOneToOne: false
            referencedRelation: "budgets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      updates_tracking: {
        Row: {
          created_at: string
          entity_id: string
          entity_type: Database["public"]["Enums"]["entity_type_enum"]
          id: string
          last_updated: string
          message: string | null
          status: Database["public"]["Enums"]["update_status_enum"]
        }
        Insert: {
          created_at?: string
          entity_id: string
          entity_type: Database["public"]["Enums"]["entity_type_enum"]
          id: string
          last_updated?: string
          message?: string | null
          status: Database["public"]["Enums"]["update_status_enum"]
        }
        Update: {
          created_at?: string
          entity_id?: string
          entity_type?: Database["public"]["Enums"]["entity_type_enum"]
          id?: string
          last_updated?: string
          message?: string | null
          status?: Database["public"]["Enums"]["update_status_enum"]
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar: string | null
          created_at: string
          deleted_at: string | null
          email: string
          id: string
          name: string | null
          updated_at: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          deleted_at?: string | null
          email: string
          id: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string
          id?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      wallets: {
        Row: {
          balance: number
          created_at: string
          deleted_at: string | null
          id: string
          name: string
          plan_id: string
          type: Database["public"]["Enums"]["wallet_type_enum"]
          updated_at: string
        }
        Insert: {
          balance?: number
          created_at?: string
          deleted_at?: string | null
          id: string
          name: string
          plan_id: string
          type: Database["public"]["Enums"]["wallet_type_enum"]
          updated_at?: string
        }
        Update: {
          balance?: number
          created_at?: string
          deleted_at?: string | null
          id?: string
          name?: string
          plan_id?: string
          type?: Database["public"]["Enums"]["wallet_type_enum"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallets_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      entity_type_enum: "Wallets" | "Goals"
      role_enum: "Admin" | "Viewer"
      status_enum: "Pending" | "Accepted" | "Declined" | "Active" | "Archived"
      transaction_status_enum: "Draft" | "Finalized" | "Canceled"
      update_status_enum: "Pending" | "Processing" | "Completed" | "Failed"
      wallet_type_enum: "Bank" | "Cash"
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

