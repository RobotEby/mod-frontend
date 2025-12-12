-- Cria enum types somente se não existirem
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('admin', 'customer');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
    CREATE TYPE order_status AS ENUM
      ('pending_payment', 'sent_to_factory', 'in_production', 'shipped', 'delivered');
  END IF;
END$$;

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles
(
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    address TEXT,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'customer',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies (users autenticados só podem operar em seu próprio profile)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Users can view their own profile'
      AND schemaname = 'public'
      AND tablename = 'profiles'
  ) THEN
    CREATE POLICY "Users can view their own profile"
      ON public.profiles FOR SELECT
      TO authenticated
      USING ((auth.uid()) = id);
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Users can update their own profile'
      AND schemaname = 'public'
      AND tablename = 'profiles'
  ) THEN
    CREATE POLICY "Users can update their own profile"
      ON public.profiles FOR UPDATE
      TO authenticated
      USING ((auth.uid()) = id)
      WITH CHECK ((auth.uid()) = id);
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Users can insert their own profile'
      AND schemaname = 'public'
      AND tablename = 'profiles'
  ) THEN
    CREATE POLICY "Users can insert their own profile"
      ON public.profiles FOR INSERT
      TO authenticated
      WITH CHECK ((auth.uid()) = id);
  END IF;
END
$$;

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read, admin write)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Anyone can view categories'
      AND schemaname = 'public'
      AND tablename = 'categories'
  ) THEN
    CREATE POLICY "Anyone can view categories"
      ON public.categories FOR SELECT
      USING (true);
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Admins can modify categories'
      AND schemaname = 'public'
      AND tablename = 'categories'
  ) THEN
    CREATE POLICY "Admins can modify categories"
      ON public.categories FOR ALL
      TO authenticated
      USING ((auth.jwt() ->> 'role') = 'admin')
      WITH CHECK ((auth.jwt() ->> 'role') = 'admin');
  END IF;
END
$$;

-- Create products table
CREATE TABLE IF NOT EXISTS public.products
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    dimensions TEXT,
    lead_time TEXT,
    main_image_url TEXT,
    gallery_images TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products policies (public read)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Anyone can view products'
      AND schemaname = 'public'
      AND tablename = 'products'
  ) THEN
    CREATE POLICY "Anyone can view products"
      ON public.products FOR SELECT
      USING (true);
  END IF;
END
$$;

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    total_amount NUMERIC(10, 2) NOT NULL,
    status order_status NOT NULL DEFAULT 'pending_payment',
    shipping_address TEXT,
    shipping_phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Orders policies (usuários autenticados podem ver/criar seus pedidos)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Users can view their own orders'
      AND schemaname = 'public'
      AND tablename = 'orders'
  ) THEN
    CREATE POLICY "Users can view their own orders"
      ON public.orders FOR SELECT
      TO authenticated
      USING ((auth.uid()) = user_id);
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Users can create their own orders'
      AND schemaname = 'public'
      AND tablename = 'orders'
  ) THEN
    CREATE POLICY "Users can create their own orders"
      ON public.orders FOR INSERT
      TO authenticated
      WITH CHECK ((auth.uid()) = user_id);
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Users can update their own orders'
      AND schemaname = 'public'
      AND tablename = 'orders'
  ) THEN
    CREATE POLICY "Users can update their own orders"
      ON public.orders FOR UPDATE
      TO authenticated
      USING ((auth.uid()) = user_id)
      WITH CHECK ((auth.uid()) = user_id);
  END IF;
END
$$;

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    price_at_purchase NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on order_items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Order items policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Users can view their own order items'
      AND schemaname = 'public'
      AND tablename = 'order_items'
  ) THEN
    CREATE POLICY "Users can view their own order items"
      ON public.order_items FOR SELECT
      TO authenticated
      USING (
        EXISTS (
          SELECT 1
          FROM public.orders o
          WHERE o.id = public.order_items.order_id
            AND o.user_id = auth.uid()
        )
      );
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Users can create order items for their orders'
      AND schemaname = 'public'
      AND tablename = 'order_items'
  ) THEN
    CREATE POLICY "Users can create order items for their orders"
      ON public.order_items FOR INSERT
      TO authenticated
      WITH CHECK (
        EXISTS (
          SELECT 1
          FROM public.orders o
          WHERE o.id = public.order_items.order_id
            AND o.user_id = auth.uid()
        )
      );
  END IF;
END
$$;

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
    SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        'customer'::user_role
    )
    ON CONFLICT (id) DO NOTHING; -- evita erro se o profile já existir
    RETURN NEW;
END;
$$;

-- Create trigger for new user profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

--------------------------------------------------------------------------------
-- Storage: create bucket (INSERT may require admin privileges) and policies
--------------------------------------------------------------------------------

-- NOTE: In Supabase managed services, creating buckets is usually done via the API/SDK or Dashboard.
-- Inserting directly into storage.buckets may fail without elevated permissions.
-- If INSERT fails, create the bucket using the Supabase Dashboard or the CLI:
--   supabase storage create-bucket product-images --public
-- or via the Storage API.

-- Inserção de registro do bucket — pode falhar sem privilégios
INSERT INTO storage.buckets (id, name, "public", file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING; -- evita erro se já existir

-- Storage policies for product-images bucket
-- Allow authenticated users to upload product images (ensure owner linkage if available)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Authenticated users can upload product images'
      AND schemaname = 'storage'
      AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Authenticated users can upload product images"
      ON storage.objects
      FOR INSERT
      TO authenticated
      WITH CHECK (
        bucket_id = 'product-images'
        -- AND owner = auth.uid()  -- uncomment if storage.objects has owner column to bind files to users
      );
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Anyone can view product images'
      AND schemaname = 'storage'
      AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Anyone can view product images"
      ON storage.objects
      FOR SELECT
      USING (bucket_id = 'product-images');
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Owners can update their product images'
      AND schemaname = 'storage'
      AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Owners can update their product images"
      ON storage.objects
      FOR UPDATE
      TO authenticated
      USING (
        bucket_id = 'product-images'
        AND owner = auth.uid()
      );
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Owners can delete their product images'
      AND schemaname = 'storage'
      AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Owners can delete their product images"
      ON storage.objects
      FOR DELETE
      TO authenticated
      USING (
        bucket_id = 'product-images'
        AND owner = auth.uid()
      );
  END IF;
END
$$;