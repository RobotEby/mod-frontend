import { useWishlist } from '@/contexts/WishlistContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlistItems } = useWishlist();

  const { data: products, isLoading } = useQuery({
    queryKey: ['wishlist-products', wishlistItems],
    queryFn: async () => {
      if (wishlistItems.length === 0) return [];

      const productIds = wishlistItems.map((item) => item.product_id);
      const { data, error } = await supabase.from('products').select('*').in('id', productIds);

      if (error) throw error;
      return data;
    },
    enabled: wishlistItems.length > 0,
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/catalogo">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 fill-primary text-primary" />
            <h1 className="text-4xl font-bold">Minha Lista de Desejos</h1>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Sua lista de desejos está vazia</h2>
            <p className="text-muted-foreground mb-6">
              Adicione produtos que você gosta para acompanhar depois
            </p>
            <Link to="/catalogo">
              <Button>Explorar Produtos</Button>
            </Link>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'produto' : 'produtos'} na sua
              lista
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products?.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.main_image_url || ''}
                  leadTime={product.lead_time || undefined}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
