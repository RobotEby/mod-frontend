import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface Wishlist {
  id: string;
  name: string;
  user_id: string;
}

interface WishlistItem {
  id: string;
  wishlist_id: string;
  product_id: string;
  added_at: string;
}

interface WishlistContextType {
  wishlistId: string | null;
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
  const { user } = useAuth();
  const [wishlistId, setWishlistId] = useState<string | null>(null);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const fetchOrCreateWishlist = async () => {
    if (!user) return;

    const { data: existingWishlist } = await supabase
      .from('wishlists')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (existingWishlist) {
      setWishlistId(existingWishlist.id);
      return existingWishlist.id;
    }

    const { data: newWishlist, error } = await supabase
      .from('wishlists')
      .insert({ user_id: user.id })
      .select()
      .single();

    if (error) throw error;
    setWishlistId(newWishlist.id);
    return newWishlist.id;
  };

  const fetchWishlistItems = async () => {
    if (!wishlistId) return;

    const { data, error } = await supabase
      .from('wishlist_items')
      .select('*')
      .eq('wishlist_id', wishlistId);

    if (error) {
      console.error('Error fetching wishlist items:', error);
      return;
    }

    setWishlistItems(data || []);
  };

  const refreshWishlist = async () => {
    if (user) {
      const id = await fetchOrCreateWishlist();
      if (id) {
        await fetchWishlistItems();
      }
    }
  };

  useEffect(() => {
    if (user) {
      refreshWishlist();
    } else {
      setWishlistId(null);
      setWishlistItems([]);
    }
  }, [user]);

  useEffect(() => {
    if (wishlistId) {
      fetchWishlistItems();
    }
  }, [wishlistId]);

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.product_id === productId);
  };

  const addToWishlist = async (productId: string) => {
    if (!user) {
      toast.error('Faça login para adicionar à lista de desejos');
      return;
    }

    const wlId = wishlistId || (await fetchOrCreateWishlist());
    if (!wlId) return;

    const { error } = await supabase
      .from('wishlist_items')
      .insert({ wishlist_id: wlId, product_id: productId });

    if (error) {
      toast.error('Erro ao adicionar à lista de desejos');
      return;
    }

    toast.success('Adicionado à lista de desejos');
    await fetchWishlistItems();
  };

  const removeFromWishlist = async (productId: string) => {
    if (!wishlistId) return;

    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('wishlist_id', wishlistId)
      .eq('product_id', productId);

    if (error) {
      toast.error('Erro ao remover da lista de desejos');
      return;
    }

    toast.success('Removido da lista de desejos');
    await fetchWishlistItems();
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
        wishlistId,
        wishlistItems,
        wishlistCount: wishlistItems.length,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        refreshWishlist,
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
