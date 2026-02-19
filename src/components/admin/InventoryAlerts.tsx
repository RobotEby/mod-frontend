import { AlertTriangle, Package, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockProducts } from '@/lib/mockData';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const InventoryAlerts = () => {
  const lowStockProducts = mockProducts
    .filter((p) => p.stock_quantity <= p.low_stock_threshold)
    .sort((a, b) => a.stock_quantity - b.stock_quantity)
    .slice(0, 5);

  const outOfStock = lowStockProducts.filter((p) => p.stock_quantity === 0);
  const lowStock = lowStockProducts.filter((p) => p.stock_quantity > 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-roboto-semibold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Alertas de Estoque
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/admin/estoque" className="gap-1">
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {lowStockProducts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Nenhum alerta de estoque no momento</p>
          </div>
        ) : (
          <div className="space-y-4">
            {outOfStock.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-roboto-medium text-destructive uppercase tracking-wide">
                  Sem Estoque ({outOfStock.length})
                </p>
                {outOfStock.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={product.main_image_url || ''}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-roboto-medium text-sm truncate max-w-[200px]">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                      </div>
                    </div>
                    <Badge variant="destructive">Esgotado</Badge>
                  </div>
                ))}
              </div>
            )}

            {lowStock.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-roboto-medium text-amber-600 uppercase tracking-wide">
                  Estoque Baixo ({lowStock.length})
                </p>
                {lowStock.map((product) => {
                  const stockPercent = (product.stock_quantity / product.low_stock_threshold) * 100;
                  return (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 bg-amber-500/10 rounded-lg border border-amber-500/20"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={product.main_image_url || ''}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-roboto-medium text-sm truncate">{product.name}</p>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={stockPercent}
                              className={cn(
                                'h-1.5 w-16',
                                stockPercent <= 50 ? '[&>div]:bg-amber-500' : '[&>div]:bg-primary',
                              )}
                            />
                            <span className="text-xs text-muted-foreground">
                              {product.stock_quantity} un.
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-amber-500 text-amber-600">
                        Baixo
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
