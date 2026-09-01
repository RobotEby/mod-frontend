import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Clock, AlertTriangle, Eye } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { cn } from '@/lib/utils';

interface ProductCardListProps {
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
  description?: string | null;
  onQuickView?: () => void;
}

export const ProductCardList = ({
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
  description,
  onQuickView,
}: ProductCardListProps) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isOutOfStock = stockQuantity === 0;
  const isLowStock = stockQuantity > 0 && stockQuantity <= lowStockThreshold;
  const pixPrice = price * 0.9;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) addItem({ id, name, price, image });
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
    <Link to={`/produto/${id}`} className="block group">
      <Card className="overflow-hidden border border-border hover:shadow-medium transition-shadow duration-300">
        <div className="flex flex-row gap-0">
          <div className="relative w-32 h-32 sm:w-44 sm:h-44 flex-shrink-0 overflow-hidden bg-muted">
            {isOnSale && discountPercent && (
              <span className="absolute top-2 left-2 z-10 bg-destructive text-destructive-foreground text-[10px] font-roboto-bold-bold px-1.5 py-0.5 rounded">
                -{discountPercent}%
              </span>
            )}
            <img
              src={image}
              alt={name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <CardContent className="flex-1 p-3 sm:p-4 flex flex-col justify-between min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-base font-roboto-medium text-foreground line-clamp-2 leading-tight mb-1">
                  {name}
                </h3>
                {description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2 hidden sm:block">
                    {description}
                  </p>
                )}
                {isLowStock && !isOutOfStock && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-orange-600 font-roboto-medium">
                    <AlertTriangle className="h-3 w-3" /> Últimas unidades
                  </span>
                )}
                {isOutOfStock && (
                  <span className="inline-flex text-[10px] text-muted-foreground font-roboto-medium">
                    Esgotado
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5 flex-shrink-0">
                <button
                  onClick={handleToggleWishlist}
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Favoritar"
                >
                  <Heart
                    className={cn(
                      'h-4 w-4',
                      isInWishlist(id)
                        ? 'fill-destructive text-destructive'
                        : 'text-muted-foreground',
                    )}
                  />
                </button>
                {onQuickView && (
                  <button
                    onClick={handleQuickView}
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
                    aria-label="Ver rápido"
                  >
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mt-2">
              <div>
                {isOnSale && originalPrice && (
                  <p className="text-xs text-muted-foreground line-through">
                    R$ {originalPrice.toFixed(2).replace('.', ',')}
                  </p>
                )}
                <p className="text-base sm:text-lg font-roboto-bold-bold text-foreground leading-none">
                  R$ {price.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-xs font-roboto-medium text-green-600 mt-0.5">
                  R$ {pixPrice.toFixed(2).replace('.', ',')} no PIX
                </p>
                {leadTime && (
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    {leadTime}
                  </p>
                )}
              </div>

              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full sm:w-auto min-h-[44px] text-xs sm:text-sm"
              >
                <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                {isOutOfStock ? 'Esgotado' : 'Adicionar'}
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};
