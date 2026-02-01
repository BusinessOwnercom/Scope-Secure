export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      product_variants: {
        Row: {
          id: string;
          guard_length: string;
          scope_height: string;
          mount_diameter: string;
          finish: string;
          sku: string;
          quantity: number;
          low_stock_threshold: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          guard_length: string;
          scope_height: string;
          mount_diameter: string;
          finish?: string;
          sku: string;
          quantity?: number;
          low_stock_threshold?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          guard_length?: string;
          scope_height?: string;
          mount_diameter?: string;
          finish?: string;
          sku?: string;
          quantity?: number;
          low_stock_threshold?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      inventory_transactions: {
        Row: {
          id: string;
          variant_id: string;
          quantity_change: number;
          reason: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          variant_id: string;
          quantity_change: number;
          reason?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          variant_id?: string;
          quantity_change?: number;
          reason?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Helper types
export type ProductVariant = Database["public"]["Tables"]["product_variants"]["Row"];
export type ProductVariantInsert = Database["public"]["Tables"]["product_variants"]["Insert"];
export type ProductVariantUpdate = Database["public"]["Tables"]["product_variants"]["Update"];

export type InventoryTransaction = Database["public"]["Tables"]["inventory_transactions"]["Row"];
export type InventoryTransactionInsert = Database["public"]["Tables"]["inventory_transactions"]["Insert"];
