import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardList } from '@/components/ProductCardList';
import { ProductQuickView } from '@/components/ProductQuickView';
import { QuickFilters } from '@/components/QuickFilters';
import { ViewToggle } from '@/components/ViewToggle';
import { MobileFilterDrawer } from '@/components/MobileFilterDrawing';
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
import { Search, Star, Percent, X, Filter, Wallet, Crown, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { mockProducts, mockCategories } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  isOnSale?: boolean;
  main_image_url: string | null;
  description?: string;
  lead_time?: string | null;
  stock_quantity?: number | null;
  low_stock_threshold?: number | null;
  gallery_images?: string[] | null;
  category_id?: string | null;
  created_at: string;
}

const filterPresets = [
  {
    id: 'budget-friendly',
    label: 'Econômico',
    icon: Wallet,
    filters: ['sale', 'free-shipping'],
    description: 'Produtos em promoção com frete grátis',
  },
  {
    id: 'premium',
    label: 'Premium',
    icon: Crown,
    filters: ['top-rated', 'in-stock'],
    description: 'Produtos bem avaliados e pronta entrega',
  },
  {
    id: 'quick-ship',
    label: 'Entrega Express',
    icon: Zap,
    filters: ['fast-delivery', 'in-stock'],
    description: 'Entrega rápida e disponível agora',
  },
];

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('categoria'),
  );
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showOffers, setShowOffers] = useState(searchParams.get('ofertas') === 'true');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    const saved = localStorage.getItem('catalog-view-mode');
    return (saved as 'grid' | 'list') || 'grid';
  });
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);
  const [isSticky, setIsSticky] = useState(false);

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const categoria = searchParams.get('categoria');
    const ofertas = searchParams.get('ofertas');
    if (categoria) setSelectedCategory(categoria);
    if (ofertas === 'true') setShowOffers(true);
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem('catalog-view-mode', viewMode);
  }, [viewMode]);

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
      activeQuickFilters,
    ],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      let filtered = [...mockProducts];

      if (showOffers || activeQuickFilters.includes('sale')) {
        filtered = filtered.filter((p) => p.isOnSale);
      }

      if (activeQuickFilters.includes('free-shipping')) {
        filtered = filtered.filter((p) => p.price >= 2000);
      }

      if (activeQuickFilters.includes('fast-delivery')) {
        filtered = filtered.filter((p) => {
          const leadTimeDays = parseInt(p.lead_time?.replace(/\D/g, '') || '30');
          return leadTimeDays <= 15;
        });
      }

      if (activeQuickFilters.includes('bestseller')) {
        filtered = filtered.filter((p) => (p.stock_quantity ?? 0) >= 10);
      }

      if (activeQuickFilters.includes('top-rated')) {
        filtered = filtered.filter((p) => p.discountPercent && p.discountPercent >= 10);
      }

      if (activeQuickFilters.includes('in-stock')) {
        filtered = filtered.filter((p) => (p.stock_quantity ?? 0) > 0);
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

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, 50000]);
    setSearchQuery('');
    setMinRating(0);
    setSortBy('newest');
    setShowOffers(false);
    setActiveQuickFilters([]);
    setSearchParams({});
  };

  const activeFilterCount = [
    selectedCategory,
    priceRange[0] > 0 || priceRange[1] < 50000,
    searchQuery,
    minRating > 0,
    showOffers,
    activeQuickFilters.length > 0,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen py-12 animate-fade-in">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 animate-slide-up">
            {showOffers ? 'Ofertas Especiais' : 'Catálogo de Móveis'}
          </h1>
          <p className="text-lg text-muted-foreground mb-6 animate-slide-up [animation-delay:100ms]">
            {showOffers
              ? 'Aproveite os melhores preços em móveis selecionados'
              : 'Explore nossa coleção completa de móveis de luxo'}
          </p>

          <div className="flex flex-col md:flex-row gap-4 animate-slide-up [animation-delay:200ms]">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px]">
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

              <ViewToggle view={viewMode} onViewChange={setViewMode} />
            </div>
          </div>

          <div
            className={cn(
              'sticky top-16 z-30 py-4 -mx-4 px-4 mt-4 transition-all duration-300',
              isSticky
                ? 'bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-sm'
                : 'bg-transparent border-b border-transparent',
            )}
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                Filtros rápidos:
              </span>
              {filterPresets.map((preset) => {
                const isActive =
                  preset.filters.every((f) => activeQuickFilters.includes(f)) &&
                  preset.filters.length === activeQuickFilters.length;
                return (
                  <Button
                    key={preset.id}
                    variant={isActive ? 'default' : 'outline'}
                    size="sm"
                    className="gap-1.5 text-xs h-7 md:h-8"
                    onClick={() => setActiveQuickFilters(isActive ? [] : preset.filters)}
                    title={preset.description}
                  >
                    <preset.icon className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    <span className="hidden sm:inline">{preset.label}</span>
                    <span className="sm:hidden">{preset.label.split(' ')[0]}</span>
                  </Button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {activeQuickFilters.length > 0 && (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant="secondary" className="gap-1.5 text-xs">
                    <Filter className="h-3 w-3" />
                    {activeQuickFilters.length} ativo{activeQuickFilters.length > 1 ? 's' : ''}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => setActiveQuickFilters([])}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              <QuickFilters
                activeFilters={activeQuickFilters}
                onFilterToggle={(filterId) =>
                  setActiveQuickFilters((prev) =>
                    prev.includes(filterId)
                      ? prev.filter((f) => f !== filterId)
                      : [...prev, filterId],
                  )
                }
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1 space-y-6 animate-slide-right">
            {activeFilterCount > 0 && (
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={handleClearFilters}
              >
                <span>Limpar Filtros ({activeFilterCount})</span>
                <X className="h-4 w-4" />
              </Button>
            )}

            <div className="bg-card p-6 rounded-lg border transition-all duration-300 hover:shadow-soft">
              <Button
                variant={showOffers ? 'default' : 'outline'}
                className="w-full justify-start gap-2 transition-all duration-300"
                onClick={handleOffersToggle}
              >
                <Percent className="h-4 w-4" />
                {showOffers ? 'Ver Todos' : 'Ver Ofertas'}
              </Button>
            </div>

            <div className="bg-card p-6 rounded-lg border transition-all duration-300 hover:shadow-soft">
              <h3 className="font-semibold text-lg mb-4">Categorias</h3>
              <div className="space-y-2">
                <Button
                  variant={selectedCategory === null ? 'default' : 'ghost'}
                  className="w-full justify-start transition-all duration-200"
                  onClick={() => handleCategoryChange(null)}
                >
                  Todas
                </Button>
                {categories?.map((category, index) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'ghost'}
                    className="w-full justify-start transition-all duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border transition-all duration-300 hover:shadow-soft">
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

            <div className="bg-card p-6 rounded-lg border transition-all duration-300 hover:shadow-soft">
              <h3 className="font-semibold text-lg mb-4">Avaliação Mínima</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1, 0].map((rating) => (
                  <Button
                    key={rating}
                    variant={minRating === rating ? 'default' : 'ghost'}
                    className="w-full justify-start transition-all duration-200"
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
                          {rating < 5 && rating > 0 && <span>e acima</span>}
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
            <div className="mb-4 text-sm text-muted-foreground">
              {products?.length ?? 0} produto(s) encontrado(s)
            </div>

            {isLoading ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={
                      viewMode === 'grid' ? 'space-y-4' : 'flex gap-4 p-4 border rounded-lg'
                    }
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <Skeleton
                      className={
                        viewMode === 'grid' ? 'aspect-square w-full animate-pulse' : 'w-48 h-48'
                      }
                    />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-8 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products && products.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 75}ms` }}
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
                        stockQuantity={product.stock_quantity ?? undefined}
                        lowStockThreshold={product.low_stock_threshold ?? undefined}
                        description={product.description}
                        galleryImages={product.gallery_images ?? undefined}
                        onQuickView={() => handleQuickView(product as Product)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 75}ms` }}
                    >
                      <ProductCardList
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        originalPrice={product.originalPrice}
                        discountPercent={product.discountPercent}
                        isOnSale={product.isOnSale}
                        image={product.main_image_url || ''}
                        description={product.description}
                        leadTime={product.lead_time || undefined}
                        stockQuantity={product.stock_quantity ?? undefined}
                        lowStockThreshold={product.low_stock_threshold ?? undefined}
                        onQuickView={() => handleQuickView(product as Product)}
                      />
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <p className="text-muted-foreground text-lg">
                  Nenhum produto encontrado com os filtros selecionados.
                </p>
                <Button variant="outline" className="mt-4" onClick={handleClearFilters}>
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductQuickView
        product={
          quickViewProduct
            ? {
                ...quickViewProduct,
                image: quickViewProduct.main_image_url || '',
                leadTime: quickViewProduct.lead_time ?? undefined,
                stockQuantity: quickViewProduct.stock_quantity ?? undefined,
                lowStockThreshold: quickViewProduct.low_stock_threshold ?? undefined,
                galleryImages: quickViewProduct.gallery_images ?? undefined,
              }
            : null
        }
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />

      <MobileFilterDrawer
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        minRating={minRating}
        onMinRatingChange={setMinRating}
        showOffers={showOffers}
        onOffersToggle={handleOffersToggle}
        activeFilterCount={activeFilterCount}
        onClearFilters={handleClearFilters}
      />
    </div>
  );
};

export default Catalog;
