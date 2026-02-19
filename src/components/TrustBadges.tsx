import React from 'react';
import { Shield, Award, Truck, RefreshCcw, CreditCard, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrustBadge {
  icon: React.ElementType;
  title: string;
  description: string;
}

const BADGES: TrustBadge[] = [
  { icon: Shield, title: 'Pagamento Seguro', description: 'Seus dados protegidos' },
  { icon: Award, title: 'Garantia de Qualidade', description: 'Móveis de alta qualidade' },
  { icon: Truck, title: 'Frete Rastreável', description: 'Acompanhe sua entrega' },
  { icon: RefreshCcw, title: 'Troca Garantida', description: '30 dias para trocar' },
  { icon: CreditCard, title: 'Parcelamento', description: 'Em até 12x sem juros' },
  { icon: Headphones, title: 'Suporte Dedicado', description: 'Atendimento especializado' },
];

interface TrustBadgesProps {
  variant?: 'compact' | 'full';
  className?: string;
  maxItems?: number;
}

const BadgeItem = ({ badge, variant }: { badge: TrustBadge; variant: 'compact' | 'full' }) => {
  const Icon = badge.icon;

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'group flex items-center gap-3 rounded-2xl border bg-card/60 p-3',
          'shadow-sm transition-all duration-300',
          'hover:-translate-y-0.5 hover:bg-card hover:shadow-md',
          'active:translate-y-0 active:shadow-sm',
          'focus-within:ring-2 focus-within:ring-primary/30',
        )}
      >
        <div
          className={cn(
            'grid h-10 w-10 place-items-center rounded-xl bg-primary/10',
            'transition-colors duration-300 group-hover:bg-primary/15',
            'flex-shrink-0',
          )}
        >
          <Icon className="h-5 w-5 text-primary" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-roboto-medium text-foreground leading-tight">{badge.title}</p>
          <p className="text-xs text-muted-foreground leading-snug">{badge.description}</p>
        </div>
      </div>
    );
  }

  // full
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border bg-card p-6 text-center',
        'shadow-sm transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-lg',
        'active:translate-y-0 active:shadow-md',
        'focus-within:ring-2 focus-within:ring-primary/30',
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/10 blur-2xl" />
      </div>

      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15">
        <Icon className="h-7 w-7 text-primary" />
      </div>

      <h3 className="font-roboto-semibold text-foreground leading-tight">{badge.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{badge.description}</p>
    </div>
  );
};

export const TrustBadges = ({ variant = 'compact', className, maxItems = 4 }: TrustBadgesProps) => {
  const list = variant === 'compact' ? BADGES.slice(0, maxItems) : BADGES;

  return (
    <div
      className={cn(
        variant === 'compact'
          ? // 2 col no mobile, 3 em telas médias, 4 no desktop
            'grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4'
          : // 1 col no mobile, 2 no sm, 3 no lg
            'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6',
        className,
      )}
    >
      {list.map((badge) => (
        <BadgeItem key={badge.title} badge={badge} variant={variant} />
      ))}
    </div>
  );
};

export default TrustBadges;
