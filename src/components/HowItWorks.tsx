import { Search, FileCheck, Settings, Truck } from 'lucide-react';

const steps = [
  {
    icon: Search,
    step: '1',
    title: 'Escolha',
    description: 'Navegue pelo catálogo e escolha os móveis perfeitos para seu espaço',
  },
  {
    icon: FileCheck,
    step: '2',
    title: 'Pedido',
    description: 'Finalize seu pedido com pagamento seguro e rastreável',
  },
  {
    icon: Settings,
    step: '3',
    title: 'Produção',
    description: 'Seu móvel é fabricado com qualidade artesanal e materiais premium',
  },
  {
    icon: Truck,
    step: '4',
    title: 'Entrega',
    description: 'Receba em casa com frete grátis e garantia estendida',
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-8 md:py-16 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-roboto-bold mb-2 md:mb-4">
            Como Funciona
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Processo simples e transparente do pedido à entrega
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="relative flex items-start md:flex-col md:items-center md:text-center group gap-4 md:gap-0"
            >
              {index < steps.length - 1 && (
                <div className="absolute left-[28px] top-14 w-0.5 h-[calc(100%)] bg-gradient-to-b from-primary/30 to-primary/10 md:hidden" />
              )}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20" />
              )}

              <div className="relative z-10 flex-shrink-0 md:mb-6">
                <div className="w-14 h-14 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-6 w-6 md:h-10 md:w-10 text-primary" />
                </div>
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-roboto-bold text-xs md:text-sm shadow-lg">
                  {step.step}
                </div>
              </div>

              <div className="flex-1 md:flex-initial pt-1 md:pt-0">
                <h3 className="text-base md:text-xl font-roboto-semibold mb-0.5 md:mb-2">
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
