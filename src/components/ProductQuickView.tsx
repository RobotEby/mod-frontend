import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ShoppingCart,
  Heart,
  Star,
  Clock,
  AlertTriangle,
  ExternalLink,
  Minus,
  Plus,
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { cn } from '@/lib/utils';

interface Product {
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
  galleryImages?: string[];
}

interface ProductQuickViewProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductQuickView = ({ product, open, onOpenChange }: ProductQuickViewProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const isOutOfStock = (product.stockQuantity ?? 10) === 0;
  const isLowStock =
    (product.stockQuantity ?? 10) > 0 &&
    (product.stockQuantity ?? 10) <= (product.lowStockThreshold ?? 5);
  const pixPrice = product.price * 0.9;

  const images = [product.image, ...(product.galleryImages || [])].filter(Boolean);

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        });
      }
      onOpenChange(false);
    }
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden animate-zoom-in">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative bg-muted p-6">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={
                  images[selectedImage] ||
                  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'
                }
                alt={product.name}
                className={cn(
                  'h-full w-full object-cover transition-all duration-500',
                  isOutOfStock && 'grayscale opacity-70',
                )}
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 mt-4 justify-center">
                {images.slice(0, 4).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200',
                      selectedImage === index
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-transparent hover:border-muted-foreground/30',
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="absolute top-8 left-8 flex flex-col gap-2">
              {product.isOnSale && product.discountPercent && (
                <Badge variant="destructive" className="animate-bounce-subtle">
                  -{product.discountPercent}%
                </Badge>
              )}
              {isLowStock && !isOutOfStock && (
                <Badge variant="secondary" className="bg-warning text-foreground">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Últimas unidades
                </Badge>
              )}
              {isOutOfStock && <Badge variant="secondary">Esgotado</Badge>}
            </div>
          </div>

          <div className="p-6 flex flex-col">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl font-bold leading-tight">{product.name}</DialogTitle>
            </DialogHeader>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(12 avaliações)</span>
            </div>

            {product.description && (
              <p className="text-muted-foreground mt-4 line-clamp-3">{product.description}</p>
            )}

            <div className="mt-6 space-y-1">
              {product.isOnSale && product.originalPrice && (
                <p className="text-lg text-muted-foreground line-through">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </p>
              )}
              <p className="text-3xl font-bold text-primary">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-lg text-success font-medium">
                R$ {pixPrice.toFixed(2).replace('.', ',')} no PIX
              </p>
            </div>

            {product.leadTime && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                <Clock className="h-4 w-4" />
                <span>Prazo de produção: {product.leadTime}</span>
              </div>
            )}

            <div className="flex items-center gap-4 mt-6">
              <span className="text-sm font-medium">Quantidade:</span>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={isOutOfStock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleAddToCart}
                className="flex-1 group"
                size="lg"
                disabled={isOutOfStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                {isOutOfStock ? 'Esgotado' : 'Adicionar ao Carrinho'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleToggleWishlist}
                className={cn(
                  'transition-all duration-300',
                  isInWishlist(product.id) && 'border-primary text-primary',
                )}
              >
                <Heart
                  className={cn(
                    'h-5 w-5 transition-all',
                    isInWishlist(product.id) && 'fill-primary animate-heartbeat',
                  )}
                />
              </Button>
            </div>

            <Link
              to={`/produto/${product.id}`}
              onClick={() => onOpenChange(false)}
              className="mt-4 flex items-center justify-center gap-2 text-sm text-primary hover:underline transition-all"
            >
              <span>Ver detalhes completos</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
