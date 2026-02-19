import { Shield, Award, Truck, RefreshCcw, CreditCard, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

const badges = [
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

export const TrustBadges = ({ variant = 'compact', className, maxItems = 4 }: TrustBadgesProps) => {
  const displayBadges = badges.slice(0, variant === 'full' ? badges.length : maxItems);

  if (variant === 'compact') {
    return (
      <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4', className)}>
        {displayBadges.map((badge) => (
          <div
            key={badge.title}
            className="flex items-center gap-2 p-2 md:p-3 rounded-lg border border-border bg-card"
          >
            <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <badge.icon className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] md:text-xs font-roboto-semibold truncate">{badge.title}</p>
              <p className="text-[9px] md:text-[10px] text-muted-foreground truncate">
                {badge.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4', className)}>
      {displayBadges.map((badge) => (
        <div
          key={badge.title}
          className="text-center p-3 md:p-4 rounded-lg border border-border bg-card"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
            <badge.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
          </div>
          <p className="text-xs md:text-sm font-roboto-semibold">{badge.title}</p>
          <p className="text-[10px] md:text-xs text-muted-foreground">{badge.description}</p>
        </div>
      ))}
    </div>
  );
};
