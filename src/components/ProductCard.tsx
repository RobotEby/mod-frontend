import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Star, Clock, AlertTriangle, Eye } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
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

  // ✅ NÃO mexi em nada de API
  const { data: reviewStats } = useQuery({
    queryKey: ['review-stats', id],
    queryFn: async () => {
      const response = await apiClient.get<{ avgRating: number; count: number }>(
        `/products/${id}/stats`,
      );

      return {
        avgRating: response.data?.avgRating || 0,
        count: response.data?.count || 0,
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
    <Link
      to={`/produto/${id}`}
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-xl"
      aria-label={`Ver produto ${name}`}
    >
      <Card
        className={cn(
          'group h-full overflow-hidden rounded-2xl border bg-card',
          'flex flex-row md:flex-col', // ✅ mobile horizontal / desktop vertical
          'transition-all duration-500 hover:shadow-large hover:-translate-y-1',
          'active:translate-y-0 active:shadow-md',
        )}
      >
        <div className="relative w-28 h-28 md:w-full md:aspect-square overflow-hidden bg-muted flex-shrink-0">
          <img
            src={image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'}
            alt={name}
            className={cn(
              'h-full w-full object-cover transition-transform duration-700 will-change-transform',
              'group-hover:scale-110',
              isOutOfStock && 'grayscale opacity-70',
            )}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-foreground/0 to-foreground/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          ...
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <CardContent className="p-3 sm:p-4 flex flex-col flex-1">
            <h3 className="font-roboto-semibold text-base sm:text-lg leading-snug mb-1.5 line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {name}
            </h3>

            {reviewStats && reviewStats.count > 0 && (
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-roboto-medium">
                  {Number(reviewStats.avgRating).toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">({reviewStats.count})</span>
              </div>
            )}

            <div className="mt-auto space-y-1">
              {isOnSale && originalPrice && (
                <p className="text-xs sm:text-sm text-muted-foreground line-through">
                  R$ {originalPrice.toFixed(2).replace('.', ',')}
                </p>
              )}

              <div className="flex items-baseline gap-2 flex-wrap">
                <p className="text-xl sm:text-2xl font-roboto-bold-bold text-primary">
                  R$ {price.toFixed(2).replace('.', ',')}
                </p>

                <p className="text-xs sm:text-sm text-success font-roboto-medium">
                  R$ {pixPrice.toFixed(2).replace('.', ',')} no PIX
                </p>
              </div>

              {leadTime && (
                <div className="flex items-center gap-1 text-[11px] sm:text-xs text-muted-foreground pt-1">
                  <Clock className="h-3 w-3" />
                  <span>{leadTime}</span>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-3 sm:p-4 pt-0 flex-shrink-0">
            <Button
              onClick={handleAddToCart}
              className={cn(
                'w-full rounded-xl',
                'group/btn transition-all duration-300',
                'hover:shadow-glow active:shadow-md',
              )}
              variant="default"
              disabled={isOutOfStock}
            >
              <ShoppingCart className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
              {isOutOfStock ? 'Esgotado' : 'Comprar'}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};
