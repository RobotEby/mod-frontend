-- Create wishlist tables
CREATE TABLE public.wishlists
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL DEFAULT 'Minha Lista de Desejos',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(user_id, name)
);

CREATE TABLE public.wishlist_items
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wishlist_id UUID NOT NULL REFERENCES public.wishlists(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(wishlist_id, product_id)
);

-- Create notifications table
CREATE TABLE public.notifications
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('price_drop', 'back_in_stock', 'wishlist_update', 'order_update', 'review_response')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT,
    images TEXT
    [] DEFAULT '{}',
  helpful_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK
    (status IN
    ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now
    (),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now
    (),
  UNIQUE
    (user_id, product_id)
);

    -- Enable RLS on all tables
    ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

    -- Wishlist policies
    CREATE POLICY "Users can view their own wishlists"
  ON public.wishlists FOR
    SELECT
        USING (auth.uid() = user_id);

    CREATE POLICY "Users can create their own wishlists"
  ON public.wishlists FOR
    INSERT
  WITH CHECK (auth.uid() =
    user_id);

    CREATE POLICY "Users can update their own wishlists"
  ON public.wishlists FOR
    UPDATE
  USING (auth.uid()
    = user_id);

    CREATE POLICY "Users can delete their own wishlists"
  ON public.wishlists FOR
    DELETE
  USING (auth.uid
    () = user_id);

    -- Wishlist items policies
    CREATE POLICY "Users can view their wishlist items"
  ON public.wishlist_items FOR
    SELECT
        USING (EXISTS (
    SELECT 1
        FROM public.wishlists
        WHERE wishlists.id = wishlist_items.wishlist_id
            AND wishlists.user_id = auth.uid()
  ));

    CREATE POLICY "Users can add to their wishlists"
  ON public.wishlist_items FOR
    INSERT
  WITH CHECK
        (EXISTS (
        SELECT 1 FROM 
    ublic.wishlists
     
    RE wishlists.id = wishlist_items.wishlist_id
  
        AND wishlists.user_id = auth.uid()
  )
    );

    CREATE POLICY "Users can remove from their wishlists"
  ON public.wishlist_items FOR
    DELETE
  USING (EXISTS
    (
    SELECT 1
    FROM public.wishlists
    WHERE wishlists.id = wishlist_items.wishlist_id
        AND wishlists.user_id = auth.uid()
  )
    );

    -- Notification policies
    CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR
    SELECT
        USING (auth.uid() = user_id);

    CREATE POLICY "Users can update their own notifications"
  ON public.notifications FOR
    UPDATE
  USING (auth.uid()
    = user_id);

    CREATE POLICY "Users can delete their own notifications"
  ON public.notifications FOR
    DELETE
  USING (auth.uid
    () = user_id);

    -- Review policies
    CREATE POLICY "Anyone can view approved reviews"
  ON public.reviews FOR
    SELECT
        USING (status = 'approved' OR auth.uid() = user_id);

    CREATE POLICY "Users can create their own reviews"
  ON public.reviews FOR
    INSERT
  WITH CHECK (auth.uid() =
    user_id);

    CREATE POLICY "Users can update their own pending reviews"
  ON public.reviews FOR
    UPDATE
  USING (auth.uid()
    = user_id AND status = 'pending');

    CREATE POLICY "Users can delete their own reviews"
  ON public.reviews FOR
    DELETE
  USING (auth.uid
    () = user_id);

    -- Create indexes for performance
    CREATE INDEX idx_wishlist_items_wishlist_id ON public.wishlist_items(wishlist_id);
    CREATE INDEX idx_wishlist_items_product_id ON public.wishlist_items(product_id);
    CREATE INDEX idx_notifications_user_id_created ON public.notifications(user_id, created_at DESC);
    CREATE INDEX idx_notifications_user_unread ON public.notifications(user_id, is_read) WHERE is_read = false;
    CREATE INDEX idx_reviews_product_status ON public.reviews(product_id, status) WHERE status = 'approved';
    CREATE INDEX idx_reviews_user_id ON public.reviews(user_id);
    CREATE INDEX idx_products_category_price ON public.products(category_id, price);
    CREATE INDEX idx_products_price ON public.products(price);

    -- Add triggers for updated_at
    CREATE TRIGGER set_wishlists_updated_at
  BEFORE
    UPDATE ON public.wishlists
  FOR EACH ROW
    EXECUTE
    FUNCTION public.handle_updated_at
    ();

    CREATE TRIGGER set_reviews_updated_at
  BEFORE
    UPDATE ON public.reviews
  FOR EACH ROW
    EXECUTE
    FUNCTION public.handle_updated_at
    ();

    -- Create function to get average rating for products
    CREATE OR REPLACE FUNCTION public.get_product_avg_rating
    (product_uuid UUID)
RETURNS NUMERIC
LANGUAGE sql
STABLE
SECURITY DEFINER
    SET search_path
    = public
AS $$
    SELECT COALESCE(AVG(rating), 0)
    FROM public.reviews
    WHERE product_id = product_uuid AND status = 'approved';
    $$;

    -- Create function to get review count for products
    CREATE OR REPLACE FUNCTION public.get_product_review_count
    (product_uuid UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
    SET search_path
    = public
AS $$
    SELECT COUNT(*)
    ::INTEGER
  FROM public.reviews
  WHERE product_id = product_uuid AND status = 'approved';
$$;