import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Star, Clock, AlertTriangle, Eye } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  isOnSale?: boolean;
  image: string;
  leadTime?: string;
  stockQuantity?: number;
  lowStockThreshold?: number;
  description?: string;
  galleryImages?: string[];
  onQuickView?: () => void;
}

export const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  discountPercent,
  isOnSale,
  image,
  leadTime,
  stockQuantity = 10,
  lowStockThreshold = 5,
  onQuickView,
}: ProductCardProps) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isOutOfStock = stockQuantity === 0;
  const isLowStock = stockQuantity > 0 && stockQuantity <= lowStockThreshold;
  const pixPrice = price * 0.9;

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
    e.stopPropagation();
    if (!isOutOfStock) {
      addItem({ id, name, price, image });
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.();
  };

  return (
    <Link to={`/produto/${id}`}>
      <Card className="group overflow-hidden transition-all duration-500 hover:shadow-large hover:-translate-y-2 hover:rotate-[0.5deg]">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'}
            alt={name}
            className={cn(
              'h-full w-full object-cover transition-all duration-700 group-hover:scale-110',
              isOutOfStock && 'grayscale opacity-70',
            )}
          />

          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-all duration-300 flex items-center justify-center">
            {onQuickView && (
              <Button
                variant="secondary"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
                onClick={handleQuickView}
              >
                <Eye className="mr-2 h-4 w-4" />
                Ver Rápido
              </Button>
            )}
          </div>

          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isOnSale && discountPercent && (
              <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-md animate-bounce-subtle">
                -{discountPercent}%
              </span>
            )}
            {isLowStock && !isOutOfStock && (
              <span className="bg-warning text-foreground text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Últimas
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded-md">
                Esgotado
              </span>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 hover:bg-background transition-all duration-300 hover:scale-110"
            onClick={handleToggleWishlist}
          >
            <Heart
              className={cn(
                'h-5 w-5 transition-all duration-300',
                isInWishlist(id)
                  ? 'fill-primary text-primary animate-heartbeat'
                  : 'text-muted-foreground',
              )}
            />
          </Button>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>

          {reviewStats && reviewStats.count > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">
                {Number(reviewStats.avgRating).toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">({reviewStats.count})</span>
            </div>
          )}

          <div className="space-y-1">
            {isOnSale && originalPrice && (
              <p className="text-sm text-muted-foreground line-through">
                R$ {originalPrice.toFixed(2).replace('.', ',')}
              </p>
            )}
            <p className="text-2xl font-bold text-primary">
              R$ {price.toFixed(2).replace('.', ',')}
            </p>
            <p className="text-sm text-success font-medium">
              R$ {pixPrice.toFixed(2).replace('.', ',')} no PIX
            </p>
          </div>

          {leadTime && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
              <Clock className="h-3 w-3" />
              <span>{leadTime}</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full group/btn transition-all duration-300 hover:shadow-glow"
            variant="default"
            disabled={isOutOfStock}
          >
            <ShoppingCart className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
            {isOutOfStock ? 'Esgotado' : 'Adicionar ao Carrinho'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
