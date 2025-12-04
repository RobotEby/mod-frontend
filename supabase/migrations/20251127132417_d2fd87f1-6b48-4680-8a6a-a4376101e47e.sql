-- Fix search_path for database functions
DROP FUNCTION IF EXISTS public.handle_updated_at
() CASCADE;
CREATE OR REPLACE FUNCTION public.handle_updated_at
()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path
= public
AS $$
BEGIN
  NEW.updated_at = now
();
RETURN NEW;
END;
$$;

-- Recreate triggers
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

DROP FUNCTION IF EXISTS public.ensure_single_default_address
() CASCADE;
CREATE OR REPLACE FUNCTION public.ensure_single_default_address
()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path
= public
AS $$
BEGIN
    IF NEW.is_default = true THEN
    UPDATE public.user_addresses
    SET is_default = false
    WHERE user_id = NEW.user_id AND id != NEW.id;
END
IF;
  RETURN NEW;
END;
$$;

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

DROP FUNCTION IF EXISTS public.ensure_single_default_payment
() CASCADE;
CREATE OR REPLACE FUNCTION public.ensure_single_default_payment
()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path
= public
AS $$
BEGIN
    IF NEW.is_default = true THEN
    UPDATE public.user_payment_methods
    SET is_default = false
    WHERE user_id = NEW.user_id AND id != NEW.id;
END
IF;
  RETURN NEW;
END;
$$;

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