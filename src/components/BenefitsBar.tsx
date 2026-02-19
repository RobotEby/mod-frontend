import { Truck, Shield, Award, Headphones } from 'lucide-react';

export const BenefitsBar = () => {
  const benefits = [
    { icon: Truck, title: 'Frete Grátis', description: 'Para todo o Brasil' },
    { icon: Shield, title: 'Pagamento Seguro', description: 'Ambiente protegido' },
    { icon: Award, title: 'Garantia Estendida', description: 'Em todos os móveis' },
    { icon: Headphones, title: 'Atendimento Dedicado', description: 'Suporte especializado' },
  ];

  return (
    <div className="border-y border-border bg-muted/30">
      <div className="container px-4">
        <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-8 py-3 md:py-8 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-2 md:gap-3 flex-shrink-0 min-w-[160px] md:min-w-0"
            >
              <div className="flex-shrink-0">
                <benefit.icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-roboto-medium-semibold text-xs md:text-sm whitespace-nowrap">
                  {benefit.title}
                </p>
                <p className="text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
