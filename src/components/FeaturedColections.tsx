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
    <section className="py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Coleções em Destaque</h2>
            <p className="text-muted-foreground">Explore nossos estilos exclusivos</p>
          </div>
          <Link
            to="/catalogo"
            className="hidden md:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            Ver Todas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-6 pb-4">
            {collections.map((collection, index) => (
              <Link
                key={collection.id}
                to={`/catalogo`}
                className="flex-shrink-0 w-72 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${collection.color} via-transparent to-transparent`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1 whitespace-normal">{collection.name}</h3>
                    <p className="text-white/80 text-sm whitespace-normal">
                      {collection.description}
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
          className="flex md:hidden items-center justify-center gap-2 text-primary font-medium mt-6"
        >
          Ver Todas as Coleções
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};
