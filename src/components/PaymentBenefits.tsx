import { QrCode, Percent, CreditCard, Truck, Gift, Shield } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

const benefits = [
  {
    icon: QrCode,
    title: 'PIX',
    highlight: '10% OFF',
    description: 'Pagamento instantâneo',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: Percent,
    title: 'Boleto',
    highlight: '10% OFF',
    description: 'Compensação em 1 dia',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: CreditCard,
    title: 'Cartão',
    highlight: '12x s/ juros',
    description: 'Em todas as compras',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Gift,
    title: 'Cashback',
    highlight: '5%',
    description: 'Na próxima compra',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    icon: Truck,
    title: 'Frete Grátis',
    highlight: 'Todo Brasil',
    description: 'Sem mínimo',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Shield,
    title: 'Garantia',
    highlight: '2 anos',
    description: 'Em todos os móveis',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
];

export const PaymentBenefits = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  return (
    <div className="border-y border-border bg-gradient-to-r from-primary/5 via-background to-primary/5">
      <div className="container py-4">
        <div className="md:hidden">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full"
          >
            <CarouselContent>
              {benefits.map((benefit) => (
                <CarouselItem key={benefit.title} className="basis-1/2">
                  <div className="flex items-center gap-3 p-2">
                    <div className={`p-2 rounded-lg ${benefit.bgColor}`}>
                      <benefit.icon className={`h-5 w-5 ${benefit.color}`} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">
                        {benefit.title} <span className={benefit.color}>{benefit.highlight}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="hidden md:grid md:grid-cols-6 gap-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className={`p-2 rounded-lg ${benefit.bgColor}`}>
                <benefit.icon className={`h-5 w-5 ${benefit.color}`} />
              </div>
              <div>
                <p className="font-bold text-sm">
                  {benefit.title} <span className={benefit.color}>{benefit.highlight}</span>
                </p>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
