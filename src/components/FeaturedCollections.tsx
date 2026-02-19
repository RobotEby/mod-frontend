import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const collections = [
  {
    id: 'minimalista',
    name: 'Coleção Minimalista',
    description: 'Linhas limpas e elegância atemporal',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    color: 'from-stone-900/80',
  },
  {
    id: 'madeira-natural',
    name: 'Madeira Natural',
    description: 'A beleza da madeira em estado puro',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    color: 'from-amber-900/80',
  },
  {
    id: 'industrial',
    name: 'Estilo Industrial',
    description: 'Ferro, madeira e personalidade',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80',
    color: 'from-zinc-900/80',
  },
  {
    id: 'contemporaneo',
    name: 'Contemporâneo',
    description: 'Modernidade com conforto',
    image: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=600&q=80',
    color: 'from-slate-900/80',
  },
  {
    id: 'rustico',
    name: 'Rústico Moderno',
    description: 'Aconchego e sofisticação',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80',
    color: 'from-orange-900/80',
  },
];

export const FeaturedCollections = () => {
  return (
    <section className="py-6 md:py-16">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-4 md:mb-10">
          <div>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-roboto-bold">
              Coleções em Destaque
            </h2>
            <p className="text-xs md:text-base text-muted-foreground hidden sm:block">
              Explore nossos estilos exclusivos
            </p>
          </div>
          <Link
            to="/catalogo"
            className="hidden sm:flex items-center gap-1 text-sm text-primary font-roboto-medium hover:underline"
          >
            Ver Todas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ScrollArea className="w-full">
          <div className="flex gap-3 md:gap-4 pb-4">
            {collections.map((c) => (
              <Link
                key={c.id}
                to={`/catalogo?colecao=${c.id}`}
                className="group flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px]"
              >
                <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${c.color} to-transparent`} />
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                    <h3 className="text-sm md:text-lg font-roboto-bold text-background">
                      {c.name}
                    </h3>
                    <p className="text-[10px] md:text-sm text-background/70 hidden sm:block">
                      {c.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <Link
          to="/catalogo"
          className="sm:hidden flex items-center justify-center gap-1 text-sm text-primary font-roboto-medium mt-2 min-h-[44px]"
        >
          Ver Todas as Coleções <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};
