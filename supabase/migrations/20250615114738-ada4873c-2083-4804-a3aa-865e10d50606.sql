
-- Insert 30 categories
INSERT INTO public.categories (id, name, description)
SELECT
  gen_random_uuid(),
  'Category ' || i,
  'This is the description for Category ' || i
FROM generate_series(1,30) AS s(i);

-- Insert 30 products, each assigned to a category
WITH cat_ids AS (
  SELECT id, row_number() OVER () as rn FROM categories ORDER BY created_at LIMIT 30
)
INSERT INTO public.products (
  id, name, category_id, price, cost, stock, description, sku, image_url, status, unit
)
SELECT
  gen_random_uuid(),
  'Product ' || i,
  c.id,
  round(random() * 990 + 10),        -- price between 10 and 1000
  round(random() * 490 + 10),        -- cost between 10 and 500
  round(random() * 49 + 1),          -- stock between 1 and 50
  'Description for Product ' || i,
  'SKU-' || lpad(i::text, 4, '0'),
  CASE 
    WHEN i % 5 = 1 THEN 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9'
    WHEN i % 5 = 2 THEN 'https://images.unsplash.com/photo-1582562124811-c09040d0a901'
    WHEN i % 5 = 3 THEN 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1'
    WHEN i % 5 = 4 THEN 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07'
    ELSE 'https://images.unsplash.com/photo-1500673922987-e212871fec22'
  END,
  'active',
  'pcs'
FROM generate_series(1,30) AS s(i)
JOIN cat_ids c ON c.rn = i;

-- NOTE: If Row Level Security (RLS) is enabled, and you want to allow all authenticated users to add/delete products/categories for now (demo/test):
-- Enable RLS if not already enabled (remove if already set):
-- ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Allow select/insert/delete for authenticated users for demo:
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all for demo' AND tablename = 'products') THEN
    CREATE POLICY "Allow all for demo" ON public.products
      FOR ALL
      USING (true)
      WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all for demo' AND tablename = 'categories') THEN
    CREATE POLICY "Allow all for demo" ON public.categories
      FOR ALL
      USING (true)
      WITH CHECK (true);
  END IF;
END$$;

