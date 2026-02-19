import { useEffect, useMemo, useState } from 'react';
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

type TimeLeft = { hours: number; minutes: number; seconds: number };

const pad2 = (n: number) => String(n).padStart(2, '0');

function tick(prev: TimeLeft): TimeLeft {
  if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
  if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
  if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
  return { hours: 23, minutes: 59, seconds: 59 };
}

export const FlashDeals = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(tick), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const flashProducts = useMemo(() => mockProducts.filter((p) => p.isOnSale).slice(0, 8), []);

  const timeLabel = `${pad2(timeLeft.hours)}:${pad2(timeLeft.minutes)}:${pad2(timeLeft.seconds)}`;

  return (
    <section className="relative py-6 sm:py-8 md:py-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-destructive/8 via-transparent to-transparent" />

      <div className="container relative px-4">
        <div className="mb-4 md:mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 grid h-10 w-10 place-items-center rounded-2xl bg-destructive/10 ring-1 ring-destructive/15 sm:h-11 sm:w-11">
              <Zap className="h-5 w-5 text-destructive" />
            </div>

            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-roboto-bold leading-tight">
                Ofertas Relâmpago
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Descontos exclusivos por tempo limitado
              </p>
            </div>
          </div>

          <div
            className="flex w-fit items-center gap-2 rounded-2xl border bg-card/70 px-3 py-2 shadow-sm backdrop-blur sm:ml-auto"
            aria-label={`Tempo restante: ${timeLabel}`}
          >
            <Clock className="h-4 w-4 text-destructive" />

            <div className="flex items-center gap-1 font-mono">
              <span className="rounded-lg bg-foreground px-2 py-1 text-xs font-roboto-semibold text-background sm:text-sm">
                {pad2(timeLeft.hours)}
              </span>
              <span className="px-0.5 text-muted-foreground">:</span>
              <span className="rounded-lg bg-foreground px-2 py-1 text-xs font-roboto-semibold text-background sm:text-sm">
                {pad2(timeLeft.minutes)}
              </span>
              <span className="px-0.5 text-muted-foreground">:</span>
              <span className="rounded-lg bg-foreground px-2 py-1 text-xs font-roboto-semibold text-background sm:text-sm">
                {pad2(timeLeft.seconds)}
              </span>
            </div>
          </div>
        </div>

        <Carousel opts={{ align: 'start', loop: true }} className="w-full">
          <CarouselContent className="-ml-3 md:-ml-4">
            {flashProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="
                  pl-3 md:pl-4
                  basis-[78%]
                  xs:basis-[68%]
                  sm:basis-1/2
                  md:basis-1/3
                  lg:basis-1/4
                "
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

          <CarouselPrevious className="hidden lg:flex -left-5 top-1/2" />
          <CarouselNext className="hidden lg:flex -right-5 top-1/2" />
        </Carousel>
      </div>
    </section>
  );
};
