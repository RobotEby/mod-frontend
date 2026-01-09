import { Truck, Wrench, Shield, Calendar, Headphones, RotateCcw } from 'lucide-react';

const services = [
  {
    icon: Truck,
    title: 'Entrega Agendada',
    description: 'Escolha o melhor dia e horário para receber seus móveis',
  },
  {
    icon: Wrench,
    title: 'Montagem Profissional',
    description: 'Equipe especializada para instalação perfeita',
  },
  {
    icon: Shield,
    title: 'Garantia Estendida',
    description: 'Até 5 anos de garantia em todos os produtos',
  },
  {
    icon: Calendar,
    title: 'Prazo Garantido',
    description: 'Entregamos no prazo combinado ou devolvemos seu dinheiro',
  },
  {
    icon: Headphones,
    title: 'Atendimento Premium',
    description: 'Suporte dedicado do pedido à entrega',
  },
  {
    icon: RotateCcw,
    title: 'Troca Facilitada',
    description: '7 dias para troca sem burocracia',
  },
];

export const ServicesBanner = () => {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Por Que Escolher a Movelaria On Demand</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Oferecemos uma experiência completa do início ao fim
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="text-center p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm transition-all duration-300 hover:bg-primary-foreground/20 hover:-translate-y-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{service.title}</h3>
              <p className="text-xs text-primary-foreground/70 line-clamp-2">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
