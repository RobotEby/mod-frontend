import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Palette, Ruler, Layers, Sparkles } from 'lucide-react';

const features = [
  { icon: Palette, title: 'Cores Personalizadas', description: 'Mais de 50 acabamentos e cores' },
  { icon: Ruler, title: 'Medidas Sob Medida', description: 'Adaptamos ao seu espaço' },
  {
    icon: Layers,
    title: 'Materiais Premium',
    description: 'Madeiras nobres e materiais de alta qualidade',
  },
  { icon: Sparkles, title: 'Design Exclusivo', description: 'Peças únicas criadas para você' },
];

export const CustomizationShowcase = () => {
  return (
    <section className="py-8 md:py-16 bg-muted/30">
      <div className="container px-4">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-12 items-center">
          <div className="flex-1 w-full">
            <div className="mb-4 md:mb-6">
              <span className="inline-block text-xs md:text-sm font-roboto-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-2 md:mb-3">
                Personalização
              </span>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-roboto-bold mb-2 md:mb-4">
                Seu Móvel, Sua Identidade
              </h2>
              <p className="text-xs md:text-base text-muted-foreground">
                Cada peça é única e feita especialmente para você. Escolha cores, dimensões e
                acabamentos que combinam com seu estilo.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-2 p-2 md:p-3 rounded-lg bg-background border border-border"
                >
                  <div className="w-7 h-7 md:w-9 md:h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm font-roboto-semibold leading-tight">
                      {feature.title}
                    </p>
                    <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild className="w-full sm:w-auto min-h-[44px]">
              <Link to="/catalogo">Explorar Opções</Link>
            </Button>
          </div>

          <div className="flex-1 w-full hidden md:block">
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <div className="space-y-2 md:space-y-4">
                <div className="rounded-lg overflow-hidden aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80"
                    alt="Personalização 1"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80"
                    alt="Personalização 2"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-2 md:space-y-4 pt-4 md:pt-8">
                <div className="rounded-lg overflow-hidden aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&q=80"
                    alt="Personalização 3"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&q=80"
                    alt="Personalização 4"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
