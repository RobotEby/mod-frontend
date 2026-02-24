import { Leaf, TreeDeciduous, Recycle, Award } from 'lucide-react';

const commitments = [
  {
    icon: TreeDeciduous,
    title: 'Madeira Certificada',
    description: '100% de origem controlada e sustentável',
  },
  { icon: Recycle, title: 'Zero Desperdício', description: 'Reaproveitamos 95% dos materiais' },
  { icon: Leaf, title: 'Baixa Emissão', description: 'Processos eco-eficientes' },
  { icon: Award, title: 'Certificações', description: 'FSC, ISO 14001 e LEED' },
];

export const SustainabilityBanner = () => {
  return (
    <section className="py-8 md:py-16 bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          <div className="relative order-2 lg:order-1 hidden md:block">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80"
                alt="Sustentabilidade"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-card p-4 lg:p-6 rounded-2xl shadow-xl border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xl lg:text-2xl font-roboto-bold text-primary">95%</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">Materiais Reciclados</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 md:space-y-8 order-1 lg:order-2">
            <div>
              <span className="text-primary font-roboto-semibold text-xs md:text-sm uppercase tracking-wider">
                Sustentabilidade
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-roboto-bold mt-1 md:mt-2 mb-2 md:mb-4 text-foreground">
                Compromisso com o Futuro
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
                Acreditamos que móveis bonitos não precisam custar o planeta. Cada peça é produzida
                com responsabilidade ambiental, utilizando madeiras de reflorestamento e processos
                sustentáveis.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {commitments.map((item, index) => (
                <div
                  key={item.title}
                  className="flex items-start gap-2 md:gap-4 p-3 md:p-4 rounded-xl bg-card/50 border animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs md:text-sm font-roboto-semibold mb-0.5 md:mb-1 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-[10px] md:text-sm text-muted-foreground leading-tight">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
