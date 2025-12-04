import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Star, Percent } from 'lucide-react';
import { mockProducts, mockCategories } from '@/lib/mockData';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('categoria'),
  );
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showOffers, setShowOffers] = useState(searchParams.get('ofertas') === 'true');

  useEffect(() => {
    const categoria = searchParams.get('categoria');
    const ofertas = searchParams.get('ofertas');
    if (categoria) setSelectedCategory(categoria);
    if (ofertas === 'true') setShowOffers(true);
  }, [searchParams]);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return mockCategories;
    },
  });

  const { data: products, isLoading } = useQuery({
    queryKey: [
      'products',
      selectedCategory,
      priceRange,
      searchQuery,
      minRating,
      sortBy,
      showOffers,
    ],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      let filtered = [...mockProducts];

      if (showOffers) {
        filtered = filtered.filter((p) => p.isOnSale);
      }

      if (selectedCategory) {
        filtered = filtered.filter((p) => p.category_id === selectedCategory);
      }

      filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(query) || p.description?.toLowerCase().includes(query),
        );
      }

      switch (sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'discount':
          filtered.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
          break;
        case 'newest':
        default:
          filtered.sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
          );
      }

      return filtered;
    },
  });

  const handleCategoryChange = (catId: string | null) => {
    setSelectedCategory(catId);
    if (catId) {
      searchParams.set('categoria', catId);
    } else {
      searchParams.delete('categoria');
    }
    setSearchParams(searchParams);
  };

  const handleOffersToggle = () => {
    const newValue = !showOffers;
    setShowOffers(newValue);
    if (newValue) {
      searchParams.set('ofertas', 'true');
    } else {
      searchParams.delete('ofertas');
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen py-12 animate-fade-in">
      <div className="container">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {showOffers ? 'Ofertas Especiais' : 'Catálogo de Móveis'}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {showOffers
              ? 'Aproveite os melhores preços em móveis selecionados'
              : 'Explore nossa coleção completa de móveis de luxo'}
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mais Recentes</SelectItem>
                <SelectItem value="price-asc">Menor Preço</SelectItem>
                <SelectItem value="price-desc">Maior Preço</SelectItem>
                <SelectItem value="discount">Maior Desconto</SelectItem>
                <SelectItem value="name">Nome A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <Button
                variant={showOffers ? 'default' : 'outline'}
                className="w-full justify-start gap-2"
                onClick={handleOffersToggle}
              >
                <Percent className="h-4 w-4" />
                {showOffers ? 'Ver Todos' : 'Ver Ofertas'}
              </Button>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold text-lg mb-4">Categorias</h3>
              <div className="space-y-2">
                <Button
                  variant={selectedCategory === null ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange(null)}
                >
                  Todas
                </Button>
                {categories?.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => handleCategoryChange(category.id)}
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

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold text-lg mb-4">Avaliação Mínima</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1, 0].map((rating) => (
                  <Button
                    key={rating}
                    variant={minRating === rating ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setMinRating(rating)}
                  >
                    <div className="flex items-center gap-2">
                      {rating > 0 ? (
                        <>
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                minRating === rating
                                  ? 'fill-yellow-500 text-yellow-500'
                                  : 'fill-muted-foreground text-muted-foreground'
                              }`}
                            />
                          ))}
                        </>
                      ) : (
                        <span>Todas</span>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full shimmer" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-8 w-1/2" />
                  </div>
                ))}
              </div>
            ) : products && products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
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
