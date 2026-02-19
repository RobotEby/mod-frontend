import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Clock, AlertTriangle, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { cn } from '@/lib/utils';

interface QuickViewProduct {
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
}

interface ProductQuickViewProps {
  product: QuickViewProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductQuickView = ({ product, open, onOpenChange }: ProductQuickViewProps) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const isOutOfStock = (product.stockQuantity ?? 10) === 0;
  const isLowStock =
    (product.stockQuantity ?? 10) > 0 &&
    (product.stockQuantity ?? 10) <= (product.lowStockThreshold ?? 5);
  const pixPrice = product.price * 0.9;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[95vw] p-0 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="relative sm:w-64 lg:w-80 flex-shrink-0 bg-muted aspect-square sm:aspect-auto sm:min-h-64">
            {product.isOnSale && product.discountPercent && (
              <span className="absolute top-3 left-3 z-10 bg-destructive text-destructive-foreground text-xs font-roboto-bold-bold px-2 py-1 rounded">
                -{product.discountPercent}%
              </span>
            )}
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
            <DialogHeader className="text-left mb-3">
              <DialogTitle className="text-base sm:text-lg font-roboto-semibold leading-tight pr-6">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            {product.description && (
              <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {isLowStock && !isOutOfStock && (
                <span className="inline-flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full font-roboto-medium">
                  <AlertTriangle className="h-3 w-3" /> Últimas unidades
                </span>
              )}
              {isOutOfStock && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  Esgotado
                </span>
              )}
              {product.leadTime && (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {product.leadTime}
                </span>
              )}
            </div>

            <div className="mb-5">
              {product.isOnSale && product.originalPrice && (
                <p className="text-sm text-muted-foreground line-through">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </p>
              )}
              <p className="text-2xl font-roboto-bold-bold text-foreground">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-sm font-roboto-medium text-green-600 mt-0.5">
                R$ {pixPrice.toFixed(2).replace('.', ',')} no PIX
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => {
                  if (!isOutOfStock) {
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    });
                    onOpenChange(false);
                  }
                }}
                disabled={isOutOfStock}
                className="flex-1 min-h-[44px]"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {isOutOfStock ? 'Esgotado' : 'Adicionar ao Carrinho'}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleWishlist(product.id)}
                className="min-h-[44px] min-w-[44px]"
                aria-label="Favoritar"
              >
                <Heart
                  className={cn(
                    'h-4 w-4',
                    isInWishlist(product.id)
                      ? 'fill-destructive text-destructive'
                      : 'text-muted-foreground',
                  )}
                />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
