import { useState } from 'react';
import { SlidersHorizontal, X, Star, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface MobileFilterDrawerProps {
  categories: Category[] | undefined;
  selectedCategory: string | null;
  onCategoryChange: (catId: string | null) => void;
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
  minRating: number;
  onMinRatingChange: (rating: number) => void;
  showOffers: boolean;
  onOffersToggle: () => void;
  activeFilterCount: number;
  onClearFilters: () => void;
}

export const MobileFilterDrawer = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
  showOffers,
  onOffersToggle,
  activeFilterCount,
  onClearFilters,
}: MobileFilterDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          className="fixed bottom-20 right-4 z-40 rounded-full shadow-lg h-14 w-14 lg:hidden"
          size="icon"
        >
          <SlidersHorizontal className="h-5 w-5" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-medium">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="border-b">
          <DrawerTitle className="flex items-center justify-between">
            <span>Filtros</span>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4 mr-1" />
                Limpar ({activeFilterCount})
              </Button>
            )}
          </DrawerTitle>
        </DrawerHeader>

        <ScrollArea className="flex-1 px-4 py-4">
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-base">Promoções</h3>
              <Button
                variant={showOffers ? 'default' : 'outline'}
                className="w-full justify-start gap-2"
                onClick={onOffersToggle}
              >
                <Percent className="h-4 w-4" />
                {showOffers ? 'Ver Todos os Produtos' : 'Ver Apenas Ofertas'}
              </Button>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-base">Categorias</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={selectedCategory === null ? 'default' : 'outline'}
                  size="sm"
                  className="justify-start"
                  onClick={() => onCategoryChange(null)}
                >
                  Todas
                </Button>
                {categories?.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    className="justify-start truncate"
                    onClick={() => onCategoryChange(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-base">Faixa de Preço</h3>
              <div className="px-2">
                <Slider
                  min={0}
                  max={50000}
                  step={500}
                  value={priceRange}
                  onValueChange={onPriceRangeChange}
                  className="my-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>R$ {priceRange[0].toLocaleString('pt-BR')}</span>
                  <span>R$ {priceRange[1].toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-base">Avaliação Mínima</h3>
              <div className="grid grid-cols-2 gap-2">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Button
                    key={rating}
                    variant={minRating === rating ? 'default' : 'outline'}
                    size="sm"
                    className="justify-start"
                    onClick={() => onMinRatingChange(rating)}
                  >
                    {rating > 0 ? (
                      <div className="flex items-center gap-1">
                        {Array.from({ length: rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                        ))}
                        <span className="ml-1 text-xs">& acima</span>
                      </div>
                    ) : (
                      <span>Todas</span>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <DrawerFooter className="border-t flex-row gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClearFilters}
            disabled={activeFilterCount === 0}
          >
            Limpar Filtros
          </Button>
          <DrawerClose asChild>
            <Button className="flex-1">Aplicar Filtros</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
