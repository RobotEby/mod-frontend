import { Percent, Truck, Clock, Flame, Star, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface QuickFilter {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

const filters: QuickFilter[] = [
  {
    id: 'sale',
    label: 'Em Promoção',
    icon: Percent,
    color: 'text-red-500',
  },
  {
    id: 'free-shipping',
    label: 'Frete Grátis',
    icon: Truck,
    color: 'text-green-500',
  },
  {
    id: 'fast-delivery',
    label: 'Entrega Rápida',
    icon: Clock,
    color: 'text-blue-500',
  },
  {
    id: 'bestseller',
    label: 'Mais Vendidos',
    icon: Flame,
    color: 'text-orange-500',
  },
  {
    id: 'top-rated',
    label: 'Bem Avaliados',
    icon: Star,
    color: 'text-amber-500',
  },
  {
    id: 'in-stock',
    label: 'Pronta Entrega',
    icon: Package,
    color: 'text-primary',
  },
];

interface QuickFiltersProps {
  activeFilters: string[];
  onFilterToggle: (filterId: string) => void;
}

export const QuickFilters = ({ activeFilters, onFilterToggle }: QuickFiltersProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => {
        const isActive = activeFilters.includes(filter.id);
        return (
          <Badge
            key={filter.id}
            variant={isActive ? 'default' : 'outline'}
            className={cn(
              'cursor-pointer flex-shrink-0 gap-1.5 px-3 py-1.5 text-sm transition-all hover:scale-105',
              isActive && 'bg-primary text-primary-foreground',
            )}
            onClick={() => onFilterToggle(filter.id)}
          >
            <filter.icon
              className={cn('h-3.5 w-3.5', isActive ? 'text-primary-foreground' : filter.color)}
            />
            {filter.label}
          </Badge>
        );
      })}
    </div>
  );
};
