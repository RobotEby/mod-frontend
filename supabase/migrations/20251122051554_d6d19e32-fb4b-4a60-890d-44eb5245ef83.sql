-- Create enum types
CREATE TYPE user_role AS ENUM
('admin', 'customer');
CREATE TYPE order_status AS ENUM
('pending_payment', 'sent_to_factory', 'in_production', 'shipped', 'delivered');

-- Create profiles table
CREATE TABLE public.profiles
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

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR
SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR
UPDATE
  USING (auth.uid()
= id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR
INSERT
  WITH CHECK (auth.uid() =
id);

-- Create categories table
CREATE TABLE public.categories
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
CREATE POLICY "Anyone can view categories"
  ON public.categories FOR
SELECT
    USING (true);

-- Create products table
CREATE TABLE public.products
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    dimensions TEXT,
    lead_time TEXT,
    main_image_url TEXT,
    gallery_images TEXT
    [],
  created_at TIMESTAMPTZ DEFAULT NOW
    ()
);

    -- Enable RLS on products
    ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

    -- Products policies (public read)
    CREATE POLICY "Anyone can view products"
  ON public.products FOR
    SELECT
        USING (true);

    -- Create orders table
    CREATE TABLE public.orders
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

    -- Orders policies
    CREATE POLICY "Users can view their own orders"
  ON public.orders FOR
    SELECT
        USING (auth.uid() = user_id);

    CREATE POLICY "Users can create their own orders"
  ON public.orders FOR
    INSERT
  WITH CHECK (auth.uid() =
    user_id);

    -- Create order_items table
    CREATE TABLE public.order_items
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
    CREATE POLICY "Users can view their own order items"
  ON public.order_items FOR
    SELECT
        USING (
    EXISTS (
      SELECT 1
        FROM public.orders
        WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
    )
  );

    CREATE POLICY "Users can create order items for their orders"
  ON public.order_items FOR
    INSERT
  WITH CHECK
        (
        EXISTS (
        SELECT 1 F
    OM public.orders
 
    HERE orders.id = order_items.order_id

        AND orders.user_id = auth.uid()
    )
    );

    -- Create function to handle new user profile creation
    CREATE OR REPLACE FUNCTION public.handle_new_user
    ()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
    SET search_path
    = public
AS $$
    BEGIN
        INSERT INTO public.profiles
            (id, full_name, role)
        VALUES
            (
                NEW.id,
                COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
                'customer'
  );
        RETURN NEW;
    END;
    $$;

    -- Create trigger for new user profile creation
    CREATE TRIGGER on_auth_user_created
  AFTER
    INSERT ON
    auth.users
    FOR EACH ROW
    EXECUTE
    FUNCTION public.handle_new_user
    ();