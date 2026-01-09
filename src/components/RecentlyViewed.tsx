import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { mockProducts } from '@/lib/mockData';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const STORAGE_KEY = 'recently-viewed-products';
const MAX_ITEMS = 10;

export const addToRecentlyViewed = (productId: string) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let items: string[] = stored ? JSON.parse(stored) : [];

    items = items.filter((id) => id !== productId);

    items.unshift(productId);

    items = items.slice(0, MAX_ITEMS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving recently viewed:', error);
  }
};

export const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState<typeof mockProducts>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        const products = ids
          .map((id) => mockProducts.find((p) => p.id === id))
          .filter(Boolean) as typeof mockProducts;
        setRecentProducts(products.slice(0, 6));
      }
    } catch (error) {
      console.error('Error loading recently viewed:', error);
    }
  }, []);

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold">Vistos Recentemente</h2>
            <p className="text-muted-foreground text-sm">Continue de onde você parou</p>
          </div>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {recentProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
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
