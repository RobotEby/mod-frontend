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
];

export const PaymentBenefits = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  return (
    <section className="py-4 md:py-8">
      <div className="container px-4">
        <div className="md:hidden">
          <Carousel
            plugins={[plugin.current]}
            opts={{ align: 'start', loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {benefits.map((b) => (
                <CarouselItem key={b.title} className="pl-2 basis-[45%] sm:basis-1/3">
                  <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card">
                    <div
                      className={`w-8 h-8 rounded-full ${b.bgColor} flex items-center justify-center flex-shrink-0`}
                    >
                      <b.icon className={`h-4 w-4 ${b.color}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-roboto-semibold truncate">
                        {b.title} <span className={b.color}>{b.highlight}</span>
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">{b.description}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
            >
              <div
                className={`w-10 h-10 rounded-full ${b.bgColor} flex items-center justify-center flex-shrink-0`}
              >
                <b.icon className={`h-5 w-5 ${b.color}`} />
              </div>
              <div>
                <p className="text-sm font-roboto-semibold">
                  {b.title} <span className={b.color}>{b.highlight}</span>
                </p>
                <p className="text-xs text-muted-foreground">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
