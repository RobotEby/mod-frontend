import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface StickyAddToCartProps {
  productName: string;
  price: number;
  onAddToCart: () => void;
  isOutOfStock?: boolean;
  isVisible: boolean;
}

export const StickyAddToCart = ({
  productName,
  price,
  onAddToCart,
  isOutOfStock = false,
  isVisible,
}: StickyAddToCartProps) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-4 shadow-lg md:hidden animate-in slide-in-from-bottom duration-300"
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate text-sm">{productName}</p>
          <p className="text-primary font-bold">
            R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <Button
          onClick={onAddToCart}
          className="gap-2 flex-shrink-0 min-h-[44px] px-6"
          disabled={isOutOfStock}
        >
          <ShoppingCart className="h-4 w-4" />
          {isOutOfStock ? 'Esgotado' : 'Adicionar'}
        </Button>
      </div>
    </div>
  );
};
