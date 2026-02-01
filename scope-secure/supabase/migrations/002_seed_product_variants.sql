-- =====================================================
-- Seed Product Variants
-- Creates all possible SKU combinations for inventory
-- =====================================================

-- Guard Lengths: 9", 11", 13", 14", 15", 17"
-- Scope Heights: 1.5", 1.75", 2"
-- Mount Diameters: 1in, 30mm, 34mm, 40mm
-- Finishes: matte-black, bare-zinc, camo

-- Total combinations: 6 lengths × 3 heights × 4 diameters × 3 finishes = 216 SKUs

INSERT INTO product_variants (guard_length, scope_height, mount_diameter, finish, sku, quantity, low_stock_threshold)
SELECT 
  gl.length,
  sh.height,
  md.diameter,
  f.finish,
  'SS-' || gl.length || '-' || sh.height || '-' || md.diameter || '-' || f.code AS sku,
  0 AS quantity,
  5 AS low_stock_threshold
FROM 
  (VALUES ('9'), ('11'), ('13'), ('14'), ('15'), ('17')) AS gl(length),
  (VALUES ('1.5'), ('1.75'), ('2')) AS sh(height),
  (VALUES ('1in'), ('30mm'), ('34mm'), ('40mm')) AS md(diameter),
  (VALUES ('matte-black', 'MB'), ('bare-zinc', 'BZ'), ('camo', 'CM')) AS f(finish, code)
ON CONFLICT (sku) DO NOTHING;

-- Verify the count
-- SELECT COUNT(*) FROM product_variants; -- Should return 216
