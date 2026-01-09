import { useState, useEffect } from 'react';
import { Zap, Clock } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { mockProducts } from '@/lib/mockData';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export const FlashDeals = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashProducts = mockProducts.filter((p) => p.isOnSale).slice(0, 8);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="py-12 bg-gradient-to-r from-destructive/10 via-destructive/5 to-transparent">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive rounded-lg animate-pulse">
              <Zap className="h-6 w-6 text-destructive-foreground" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                Ofertas Relâmpago
              </h2>
              <p className="text-muted-foreground text-sm">
                Aproveite descontos exclusivos por tempo limitado
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-destructive" />
            <div className="flex items-center gap-1">
              <div className="bg-foreground text-background px-3 py-2 rounded-lg font-mono font-bold text-xl min-w-[3rem] text-center">
                {formatNumber(timeLeft.hours)}
              </div>
              <span className="text-2xl font-bold">:</span>
              <div className="bg-foreground text-background px-3 py-2 rounded-lg font-mono font-bold text-xl min-w-[3rem] text-center">
                {formatNumber(timeLeft.minutes)}
              </div>
              <span className="text-2xl font-bold">:</span>
              <div className="bg-foreground text-background px-3 py-2 rounded-lg font-mono font-bold text-xl min-w-[3rem] text-center animate-pulse">
                {formatNumber(timeLeft.seconds)}
              </div>
            </div>
          </div>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {flashProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>
      </div>
    </section>
  );
};
