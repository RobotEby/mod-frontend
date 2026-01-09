import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/user/userSelectors';

export const useIsAdmin = () => {
  const user = useAppSelector(selectUser);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) return;

    supabase
      .rpc('has_role', { _user_id: user.id, _role: 'admin' })
      .then(({ data }) => setIsAdmin(data === true));
  }, [user]);

  return isAdmin;
};
