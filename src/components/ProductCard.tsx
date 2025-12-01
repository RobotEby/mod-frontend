import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  leadTime?: string;
}

export const ProductCard = ({ id, name, price, image, leadTime }: ProductCardProps) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const { data: reviewStats } = useQuery({
    queryKey: ['review-stats', id],
    queryFn: async () => {
      const { data: avgData } = await supabase.rpc('get_product_avg_rating', {
        product_uuid: id,
      });
      const { data: countData } = await supabase.rpc('get_product_review_count', {
        product_uuid: id,
      });
      return {
        avgRating: avgData || 0,
        count: countData || 0,
      };
    },
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, name, price, image });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(id);
  };

  return (
    <Link to={`/produto/${id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'}
            alt={name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 hover:bg-background"
            onClick={handleToggleWishlist}
          >
            <Heart
              className={`h-5 w-5 ${
                isInWishlist(id) ? 'fill-primary text-primary' : 'text-muted-foreground'
              }`}
            />
          </Button>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{name}</h3>

          {reviewStats && reviewStats.count > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">
                {Number(reviewStats.avgRating).toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">({reviewStats.count})</span>
            </div>
          )}

          <p className="text-2xl font-bold text-primary">R$ {price.toFixed(2).replace('.', ',')}</p>
          {leadTime && <p className="text-sm text-muted-foreground mt-1">Prazo: {leadTime}</p>}
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button onClick={handleAddToCart} className="w-full" variant="default">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Adicionar ao Carrinho
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
