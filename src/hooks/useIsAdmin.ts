import { useEffect, useState } from 'react';
import apiClient from '@/lib/api-client';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/user/userSelectors';

export const useIsAdmin = () => {
  const user = useAppSelector(selectUser);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    const checkAdminStatus = async () => {
      try {
        const { data } = await apiClient.post<{ hasRole: boolean }>('/auth/check-role', {
          role: 'admin',
        });
        setIsAdmin(data.hasRole);
      } catch (error) {
        console.error('Failed to check admin status:', error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  return isAdmin;
};
