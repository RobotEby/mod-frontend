import { Truck, Shield, Award, Headphones } from 'lucide-react';

export const BenefitsBar = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'Frete Grátis',
      description: 'Para todo o Brasil',
    },
    {
      icon: Shield,
      title: 'Pagamento Seguro',
      description: 'Ambiente protegido',
    },
    {
      icon: Award,
      title: 'Garantia Estendida',
      description: 'Em todos os móveis',
    },
    {
      icon: Headphones,
      title: 'Atendimento Dedicado',
      description: 'Suporte especializado',
    },
  ];

  return (
    <div className="border-y border-border bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">{benefit.title}</p>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
