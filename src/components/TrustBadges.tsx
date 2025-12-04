import { Shield, Award, Truck, RefreshCcw, CreditCard, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrustBadge {
  icon: React.ElementType;
  title: string;
  description: string;
}

const badges: TrustBadge[] = [
  {
    icon: Shield,
    title: 'Pagamento Seguro',
    description: 'Seus dados protegidos',
  },
  {
    icon: Award,
    title: 'Garantia de Qualidade',
    description: 'Móveis de alta qualidade',
  },
  {
    icon: Truck,
    title: 'Frete Rastreável',
    description: 'Acompanhe sua entrega',
  },
  {
    icon: RefreshCcw,
    title: 'Troca Garantida',
    description: '30 dias para trocar',
  },
  {
    icon: CreditCard,
    title: 'Parcelamento',
    description: 'Em até 12x sem juros',
  },
  {
    icon: Headphones,
    title: 'Suporte Dedicado',
    description: 'Atendimento especializado',
  },
];

interface TrustBadgesProps {
  variant?: 'compact' | 'full';
  className?: string;
  maxItems?: number;
}

export const TrustBadges = ({ variant = 'compact', className, maxItems = 4 }: TrustBadgesProps) => {
  const displayBadges = badges.slice(0, maxItems);

  if (variant === 'compact') {
    return (
      <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-4', className)}>
        {displayBadges.map((badge) => (
          <div key={badge.title} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="p-2 bg-primary/10 rounded-lg">
              <badge.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{badge.title}</p>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {badges.map((badge) => (
        <div
          key={badge.title}
          className="flex flex-col items-center text-center p-6 bg-card rounded-xl border border-border hover:shadow-md transition-shadow"
        >
          <div className="p-4 bg-primary/10 rounded-full mb-4">
            <badge.icon className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">{badge.title}</h3>
          <p className="text-sm text-muted-foreground">{badge.description}</p>
        </div>
      ))}
    </div>
  );
};
