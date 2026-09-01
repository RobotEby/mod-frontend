import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import apiClient from '@/lib/api-client';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/user/userSelectors';
import { toast } from 'sonner';

interface WishlistItem {
  id: string;
  product_id: string;
  added_at: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  isInWishlist: (productId: string) => boolean;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  toggleWishlist: (productId: string) => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectUser);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const fetchWishlistItems = useCallback(async () => {
    if (!user) {
      setWishlistItems([]);
      return;
    }

    try {
      const { data } = await apiClient.get<WishlistItem[]>('/wishlist');
      setWishlistItems(data || []);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }
  }, [user]);

  useEffect(() => {
    fetchWishlistItems();
  }, [fetchWishlistItems]);

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.product_id === productId);
  };

  const addToWishlist = async (productId: string) => {
    if (!user) {
      toast.error('Faça login para adicionar à lista de desejos');
      return;
    }

    try {
      await apiClient.post('/wishlist', { product_id: productId });
      toast.success('Adicionado à lista de desejos');
      await fetchWishlistItems();
    } catch {
      toast.error('Erro ao adicionar à lista de desejos');
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      await apiClient.delete(`/wishlist/${productId}`);
      toast.success('Removido da lista de desejos');

      setWishlistItems((prev) => prev.filter((item) => item.product_id !== productId));
    } catch (error) {
      toast.error('Erro ao remover da lista de desejos');
      await fetchWishlistItems();
    }
  };

  const toggleWishlist = async (productId: string) => {
    if (isInWishlist(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        refreshWishlist: fetchWishlistItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};
