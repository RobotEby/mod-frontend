import { Flame, TrendingUp } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { mockProducts } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';

export const BestSellers = () => {
  const bestSellers = [...mockProducts].sort((a, b) => b.price - a.price).slice(0, 8);

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Flame className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Mais Vendidos</h2>
              <p className="text-muted-foreground text-sm flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                Os favoritos dos nossos clientes
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          {bestSellers.map((product) => (
            <div key={product.id} className="relative flex flex-col h-full">
              <div className="flex-1 flex">
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discountPercent={product.discountPercent}
                  isOnSale={product.isOnSale}
                  image={product.main_image_url || ''}
                  leadTime={product.lead_time || undefined}
                  stockQuantity={product.stock_quantity}
                  lowStockThreshold={product.low_stock_threshold}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
