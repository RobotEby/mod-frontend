import { Flame, TrendingUp } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { mockProducts } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export const BestSellers = () => {
  const bestSellers = [...mockProducts].sort((a, b) => b.price - a.price).slice(0, 8);

  return (
    <section className="py-4 md:py-12">
      <div className="container px-4">
        <div className="flex items-center gap-2 mb-3 md:mb-8">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#faece1] flex items-center justify-center">
            <Flame className="h-4 w-4 md:h-5 md:w-5 text-[#f97316]" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-roboto-bold">Mais Vendidos</h2>
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Os favoritos dos nossos clientes
            </p>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              id={product.id}
              name={product.name}
              price={Number(product.price)}
              image={product.main_image_url || ''}
              leadTime={product.lead_time || undefined}
            />
          ))}
        </div>

        <div className="md:hidden">
          <Carousel opts={{ align: 'start' }} className="w-full">
            <CarouselContent className="-ml-2">
              {bestSellers.map((product) => (
                <CarouselItem key={product.id} className="pl-2 basis-[70%] sm:basis-1/2">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={Number(product.price)}
                    image={product.main_image_url || ''}
                    leadTime={product.lead_time || undefined}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};
