import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Palette, Ruler, Layers, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Cores Personalizadas',
    description: 'Escolha entre mais de 50 acabamentos e cores',
  },
  {
    icon: Ruler,
    title: 'Medidas Sob Medida',
    description: 'Adaptamos cada peça ao seu espaço',
  },
  {
    icon: Layers,
    title: 'Materiais Premium',
    description: 'Madeiras nobres e materiais de alta qualidade',
  },
  {
    icon: Sparkles,
    title: 'Design Exclusivo',
    description: 'Peças únicas criadas para você',
  },
];

export const CustomizationShowcase = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Personalização
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-4">Seu Móvel, Sua Identidade</h2>
              <p className="text-lg text-muted-foreground">
                Cada peça é única e feita especialmente para você. Escolha cores, dimensões e
                acabamentos que combinam com seu estilo de vida.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex gap-4 p-4 rounded-xl bg-card border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" asChild>
              <Link to="/catalogo">Explorar Opções</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80"
                  alt="Personalização de cores"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"
                  alt="Acabamento premium"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-2xl overflow-hidden aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80"
                  alt="Materiais nobres"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80"
                  alt="Design exclusivo"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
