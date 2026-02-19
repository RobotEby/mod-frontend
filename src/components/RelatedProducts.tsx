import { ProductCard } from '@/components/ProductCard';
import { mockProducts } from '@/lib/mockData';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface RelatedProductsProps {
  currentProductId: string;
  categoryId: string | null;
}

export const RelatedProducts = ({ currentProductId, categoryId }: RelatedProductsProps) => {
  const relatedProducts = mockProducts
    .filter(
      (p) =>
        p.id !== currentProductId && p.category_id === categoryId && p.status !== 'out_of_stock',
    )
    .slice(0, 8);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 animate-fade-in">
      <h2 className="text-2xl font-roboto-bold mb-8">Você também pode gostar</h2>

      <Carousel
        opts={{
          align: 'start',
          loop: relatedProducts.length > 4,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {relatedProducts.map((product) => (
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
        {relatedProducts.length > 4 && (
          <>
            <CarouselPrevious className="hidden md:flex -left-4" />
            <CarouselNext className="hidden md:flex -right-4" />
          </>
        )}
      </Carousel>
    </section>
  );
};
