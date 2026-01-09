import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Heart, Eye, Clock, AlertTriangle } from 'lucide-react';
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
  description?: string;
  leadTime?: string;
  stockQuantity?: number;
  lowStockThreshold?: number;
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
  description,
  leadTime,
  stockQuantity,
  lowStockThreshold = 5,
  onQuickView,
}: ProductCardListProps) => {
  const { addItem } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isLowStock =
    stockQuantity !== undefined && stockQuantity <= lowStockThreshold && stockQuantity > 0;
  const isOutOfStock = stockQuantity === 0;
  const inWishlist = isInWishlist(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addItem({ id, name, price, image, quantity: 1 });
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.();
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-48 md:w-64 flex-shrink-0">
          <Link to={`/produto/${id}`}>
            <div className="aspect-square sm:h-full overflow-hidden bg-muted">
              <img
                src={image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Link>

          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isOnSale && discountPercent && (
              <Badge className="bg-destructive text-destructive-foreground">
                -{discountPercent}%
              </Badge>
            )}
            {isLowStock && (
              <Badge variant="outline" className="bg-warning/90 text-foreground border-warning">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Últimas unidades
              </Badge>
            )}
            {isOutOfStock && (
              <Badge variant="secondary" className="bg-muted">
                Esgotado
              </Badge>
            )}
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <Link to={`/produto/${id}`}>
              <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2">
                {name}
              </h3>
            </Link>

            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
            )}

            {leadTime && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{leadTime}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-sm text-muted-foreground line-through">
                  R$ {originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleWishlistToggle}
                className={cn(inWishlist && 'text-destructive')}
              >
                <Heart className={cn('h-5 w-5', inWishlist && 'fill-current')} />
              </Button>

              {onQuickView && (
                <Button variant="ghost" size="icon" onClick={handleQuickView}>
                  <Eye className="h-5 w-5" />
                </Button>
              )}

              <Button onClick={handleAddToCart} disabled={isOutOfStock} className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Adicionar</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
