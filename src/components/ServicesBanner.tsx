import { Truck, Wrench, Shield, Calendar, Headphones, RotateCcw } from 'lucide-react';

const services = [
  { icon: Truck, title: 'Entrega Agendada', description: 'Escolha o melhor dia e horário' },
  { icon: Wrench, title: 'Montagem Profissional', description: 'Instalação perfeita' },
  { icon: Shield, title: 'Garantia Estendida', description: 'Até 5 anos de garantia' },
  { icon: Calendar, title: 'Prazo Garantido', description: 'Ou devolvemos seu dinheiro' },
  { icon: Headphones, title: 'Atendimento Premium', description: 'Suporte dedicado' },
  { icon: RotateCcw, title: 'Troca Facilitada', description: '7 dias para troca' },
];

export const ServicesBanner = () => {
  return (
    <section className="py-8 md:py-16 bg-primary text-primary-foreground">
      <div className="container px-4">
        <div className="text-center mb-4 md:mb-12">
          <h2 className="text-lg md:text-3xl font-roboto-bold mb-1 md:mb-4">
            Por Que Escolher a Movelaria On Demand
          </h2>
          <p className="text-xs md:text-base text-primary-foreground/80 max-w-2xl mx-auto">
            Experiência completa do início ao fim
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="text-center p-3 md:p-4 rounded-lg md:rounded-xl bg-primary-foreground/10 backdrop-blur-sm transition-all duration-300 hover:bg-primary-foreground/20 hover:-translate-y-1"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-2 md:mb-4 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <service.icon className="h-5 w-5 md:h-7 md:w-7" />
              </div>
              <h3 className="font-roboto-semibold text-xs md:text-sm mb-0.5 md:mb-1">
                {service.title}
              </h3>
              <p className="text-[10px] md:text-xs text-primary-foreground/70 line-clamp-2">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
