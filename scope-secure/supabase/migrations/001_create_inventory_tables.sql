-- =====================================================
-- ScopeSecure Inventory Management Schema
-- Run this SQL in your Supabase SQL Editor
-- =====================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- Product Variants Table
-- Stores each unique SKU combination (length x height x diameter x finish)
-- =====================================================
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guard_length VARCHAR(10) NOT NULL,
  scope_height VARCHAR(10) NOT NULL,
  mount_diameter VARCHAR(10) NOT NULL,
  finish VARCHAR(50) NOT NULL DEFAULT 'matte-black',
  sku VARCHAR(50) UNIQUE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_product_variants_sku ON product_variants(sku);
CREATE INDEX IF NOT EXISTS idx_product_variants_quantity ON product_variants(quantity);
CREATE INDEX IF NOT EXISTS idx_product_variants_config ON product_variants(guard_length, scope_height, mount_diameter);

-- =====================================================
-- Inventory Transactions Table
-- Audit trail for all stock changes
-- =====================================================
CREATE TABLE IF NOT EXISTS inventory_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
  quantity_change INTEGER NOT NULL,
  reason VARCHAR(255),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for querying transactions by variant
CREATE INDEX IF NOT EXISTS idx_inventory_transactions_variant ON inventory_transactions(variant_id);
CREATE INDEX IF NOT EXISTS idx_inventory_transactions_created ON inventory_transactions(created_at DESC);

-- =====================================================
-- Row Level Security Policies
-- =====================================================

-- Enable RLS on tables
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_transactions ENABLE ROW LEVEL SECURITY;

-- Product variants: Public can read (for stock checking), only authenticated can write
CREATE POLICY "Anyone can view product variants" 
  ON product_variants FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can manage product variants" 
  ON product_variants FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Inventory transactions: Only authenticated users can access
CREATE POLICY "Authenticated users can view inventory transactions" 
  ON inventory_transactions FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create inventory transactions" 
  ON inventory_transactions FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- =====================================================
-- Function: Auto-update updated_at timestamp
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_product_variants_updated_at
  BEFORE UPDATE ON product_variants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Function: Log inventory changes automatically
-- =====================================================
CREATE OR REPLACE FUNCTION log_inventory_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.quantity IS DISTINCT FROM NEW.quantity THEN
    INSERT INTO inventory_transactions (variant_id, quantity_change, reason, created_by)
    VALUES (
      NEW.id, 
      NEW.quantity - OLD.quantity, 
      'Stock adjustment',
      auth.uid()
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER log_inventory_changes
  AFTER UPDATE OF quantity ON product_variants
  FOR EACH ROW
  EXECUTE FUNCTION log_inventory_change();
