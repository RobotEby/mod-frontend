-- Create user_addresses table
CREATE TABLE public.user_addresses
(
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    nickname TEXT,
    street TEXT NOT NULL,
    number TEXT NOT NULL,
    complement TEXT,
    neighborhood TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    reference TEXT,
    is_default BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP
    WITH TIME ZONE NOT NULL DEFAULT now
    (),
  updated_at TIMESTAMP
    WITH TIME ZONE NOT NULL DEFAULT now
    ()
);

    -- Enable RLS
    ALTER TABLE public.user_addresses ENABLE ROW LEVEL SECURITY;

    -- RLS Policies for user_addresses
    CREATE POLICY "Users can view their own addresses"
ON public.user_addresses
FOR
    SELECT
        USING (auth.uid() = user_id);

    CREATE POLICY "Users can create their own addresses"
ON public.user_addresses
FOR
    INSERT
WITH CHECK (auth.uid() =
    user_id);

    CREATE POLICY "Users can update their own addresses"
ON public.user_addresses
FOR
    UPDATE
USING (auth.uid()
    = user_id);

    CREATE POLICY "Users can delete their own addresses"
ON public.user_addresses
FOR
    DELETE
USING (auth.uid
    () = user_id);

    -- Create user_payment_methods table
    CREATE TABLE public.user_payment_methods
    (
        id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
        card_type TEXT NOT NULL,
        last4 TEXT NOT NULL,
        cardholder_name TEXT NOT NULL,
        expiry_month TEXT NOT NULL,
        expiry_year TEXT NOT NULL,
        is_default BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMP
        WITH TIME ZONE NOT NULL DEFAULT now
        (),
  updated_at TIMESTAMP
        WITH TIME ZONE NOT NULL DEFAULT now
        ()
);

        -- Enable RLS
        ALTER TABLE public.user_payment_methods ENABLE ROW LEVEL SECURITY;

        -- RLS Policies for user_payment_methods
        CREATE POLICY "Users can view their own payment methods"
ON public.user_payment_methods
FOR
        SELECT
            USING (auth.uid() = user_id);

        CREATE POLICY "Users can create their own payment methods"
ON public.user_payment_methods
FOR
        INSERT
WITH CHECK (auth.uid() =
        user_id);

        CREATE POLICY "Users can update their own payment methods"
ON public.user_payment_methods
FOR
        UPDATE
USING (auth.uid()
        = user_id);

        CREATE POLICY "Users can delete their own payment methods"
ON public.user_payment_methods
FOR
        DELETE
USING (auth.uid
        () = user_id);

        -- Create triggers for updated_at
        CREATE OR REPLACE FUNCTION public.handle_updated_at
        ()
RETURNS TRIGGER AS $$
        BEGIN
  NEW.updated_at = now
        ();
        RETURN NEW;
        END;
$$ LANGUAGE plpgsql;

        CREATE TRIGGER update_user_addresses_updated_at
BEFORE
        UPDATE ON public.user_addresses
FOR EACH ROW
        EXECUTE
        FUNCTION public.handle_updated_at
        ();

        CREATE TRIGGER update_user_payment_methods_updated_at
BEFORE
        UPDATE ON public.user_payment_methods
FOR EACH ROW
        EXECUTE
        FUNCTION public.handle_updated_at
        ();

        -- Function to ensure only one default address per user
        CREATE OR REPLACE FUNCTION public.ensure_single_default_address
        ()
RETURNS TRIGGER AS $$
        BEGIN
            IF NEW.is_default = true THEN
            UPDATE public.user_addresses
    SET is_default = false
    WHERE user_id = NEW.user_id AND id != NEW.id;
        END
        IF;
  RETURN NEW;
        END;
$$ LANGUAGE plpgsql;

        CREATE TRIGGER ensure_single_default_address_trigger
BEFORE
        INSERT OR
        UPDATE ON public.user_addresses
FOR EACH ROW
        WHEN
        (NEW.is_default = true)
        EXECUTE
        FUNCTION public.ensure_single_default_address
        ();

        -- Function to ensure only one default payment method per user
        CREATE OR REPLACE FUNCTION public.ensure_single_default_payment
        ()
RETURNS TRIGGER AS $$
        BEGIN
            IF NEW.is_default = true THEN
            UPDATE public.user_payment_methods
    SET is_default = false
    WHERE user_id = NEW.user_id AND id != NEW.id;
        END
        IF;
  RETURN NEW;
        END;
$$ LANGUAGE plpgsql;

        CREATE TRIGGER ensure_single_default_payment_trigger
BEFORE
        INSERT OR
        UPDATE ON public.user_payment_methods
FOR EACH ROW
        WHEN
        (NEW.is_default = true)
        EXECUTE
        FUNCTION public.ensure_single_default_payment
        ();

        -- Create indexes
        CREATE INDEX idx_user_addresses_user_id ON public.user_addresses(user_id);
        CREATE INDEX idx_user_payment_methods_user_id ON public.user_payment_methods(user_id);