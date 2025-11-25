import { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { mockProducts, mockCategories } from '@/lib/mockData';

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 50000]);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return mockCategories;
    },
  });

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', selectedCategory, priceRange],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      let filtered = [...mockProducts];

      if (selectedCategory) {
        filtered = filtered.filter((p) => p.category_id === selectedCategory);
      }

      filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

      return filtered.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    },
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Catálogo de Móveis</h1>
          <p className="text-lg text-muted-foreground">
            Explore nossa coleção completa de móveis de luxo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold text-lg mb-4">Categorias</h3>
              <div className="space-y-2">
                <Button
                  variant={selectedCategory === null ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(null)}
                >
                  Todas
                </Button>
                {categories?.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold text-lg mb-4">Faixa de Preço</h3>
              <div className="space-y-4">
                <Slider
                  min={0}
                  max={50000}
                  step={500}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="my-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>R$ {priceRange[0].toLocaleString('pt-BR')}</span>
                  <span>R$ {priceRange[1].toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-8 w-1/2" />
                  </div>
                ))}
              </div>
            ) : products && products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={Number(product.price)}
                    image={product.main_image_url || ''}
                    leadTime={product.lead_time || undefined}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Nenhum produto encontrado com os filtros selecionados.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
