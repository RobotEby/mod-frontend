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
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Como Funciona</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Processo simples e transparente do pedido à entrega
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative flex flex-col items-center text-center group">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20" />
              )}

              <div className="relative z-10 mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-10 w-10 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-lg">
                  {step.step}
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
