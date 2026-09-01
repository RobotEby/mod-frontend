import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Star, Clock, AlertTriangle, Eye } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  isOnSale?: boolean;
  image: string;
  leadTime?: string | null;
  stockQuantity?: number;
  lowStockThreshold?: number;
  description?: string | null;
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
    <Link to={`/produto/${id}`} className="block group">
      <Card className="overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-row md:flex-col">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-full md:h-48 lg:h-56 flex-shrink-0 overflow-hidden bg-muted">
            <button
              onClick={handleToggleWishlist}
              className="absolute top-1.5 right-1.5 md:top-2 md:right-2 z-10 w-8 h-8 md:w-9 md:h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-background transition-colors"
              aria-label="Favoritar"
            >
              <Heart
                className={cn(
                  'h-4 w-4',
                  isInWishlist(id) ? 'fill-destructive text-destructive' : 'text-muted-foreground',
                )}
              />
            </button>

            {onQuickView && (
              <button
                onClick={handleQuickView}
                className="hidden md:flex absolute top-2 left-2 z-10 items-center gap-1 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm text-xs font-roboto-medium opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Eye className="h-3 w-3" />
                Ver Rápido
              </button>
            )}

            <div className="absolute bottom-1 left-1 md:bottom-2 md:left-2 z-10 flex flex-col gap-1">
              {isOnSale && discountPercent && (
                <span className="bg-destructive text-destructive-foreground text-[10px] md:text-xs font-roboto-bold px-1.5 py-0.5 rounded">
                  -{discountPercent}%
                </span>
              )}
              {isLowStock && !isOutOfStock && (
                <span className="bg-orange-500 text-white text-[10px] md:text-xs font-roboto-medium px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <AlertTriangle className="h-2.5 w-2.5" />
                  Últimas
                </span>
              )}
              {isOutOfStock && (
                <span className="bg-muted text-muted-foreground text-[10px] md:text-xs font-roboto-medium px-1.5 py-0.5 rounded">
                  Esgotado
                </span>
              )}
            </div>

            <img
              src={image}
              alt={name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <CardContent className="flex-1 p-3 md:p-4 flex flex-col justify-between min-w-0">
            <div>
              <h3 className="text-sm md:text-base font-roboto-medium text-foreground line-clamp-2 mb-1 md:mb-2 leading-tight">
                {name}
              </h3>

              <div className="space-y-0.5">
                {isOnSale && originalPrice && (
                  <p className="text-xs text-muted-foreground line-through">
                    R$ {originalPrice.toFixed(2).replace('.', ',')}
                  </p>
                )}
                <p className="text-base md:text-lg font-roboto-bold text-foreground">
                  R$ {price.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-xs md:text-sm font-roboto-medium text-green-600">
                  R$ {pixPrice.toFixed(2).replace('.', ',')} no PIX
                </p>
              </div>

              {leadTime && (
                <p className="text-[11px] md:text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {leadTime}
                </p>
              )}
            </div>

            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="mt-2 w-full h-8 md:h-9 text-xs md:text-sm min-h-[44px] md:min-h-0"
            >
              <ShoppingCart className="h-3.5 w-3.5 mr-1" />
              <span className="md:hidden">{isOutOfStock ? 'Esgotado' : 'Comprar'}</span>
              <span className="hidden md:inline">
                {isOutOfStock ? 'Esgotado' : 'Adicionar ao Carrinho'}
              </span>
            </Button>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};
