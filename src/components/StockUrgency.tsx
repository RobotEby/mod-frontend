import { AlertTriangle, Package } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface StockUrgencyProps {
  stockQuantity: number;
  lowStockThreshold?: number;
  maxStock?: number;
}

export const StockUrgency = ({
  stockQuantity,
  lowStockThreshold = 5,
  maxStock = 20,
}: StockUrgencyProps) => {
  const isLowStock = stockQuantity <= lowStockThreshold && stockQuantity > 0;
  const isOutOfStock = stockQuantity === 0;
  const stockPercentage = Math.min((stockQuantity / maxStock) * 100, 100);

  if (isOutOfStock) {
    return (
      <div className="flex items-center gap-2 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        <span className="font-roboto-medium text-destructive">Produto indisponível</span>
      </div>
    );
  }

  if (isLowStock) {
    return (
      <div className="space-y-2 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-amber-600 animate-pulse" />
          <span className="font-roboto-medium text-amber-700">
            Apenas {stockQuantity} unidade{stockQuantity > 1 ? 's' : ''} disponível
            {stockQuantity > 1 ? 'is' : ''}!
          </span>
        </div>
        <Progress
          value={stockPercentage}
          className={cn(
            'h-2',
            stockPercentage <= 20
              ? '[&>div]:bg-destructive'
              : stockPercentage <= 50
                ? '[&>div]:bg-amber-500'
                : '[&>div]:bg-primary',
          )}
        />
        <p className="text-xs text-muted-foreground">Compre agora para garantir o seu!</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Package className="h-4 w-4 text-primary" />
      <span>Em estoque • Pronta entrega</span>
    </div>
  );
};
