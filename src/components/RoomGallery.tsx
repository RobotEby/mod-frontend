import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const rooms = [
  {
    id: 'sala-estar',
    name: 'Sala de Estar',
    description: 'Sofás, poltronas e mesas de centro',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=80',
    categoryId: 'sofas',
  },
  {
    id: 'quarto',
    name: 'Quarto',
    description: 'Camas, cômodas e guarda-roupas',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80',
    categoryId: 'camas',
  },
  {
    id: 'escritorio',
    name: 'Escritório',
    description: 'Mesas, cadeiras e estantes',
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=1200&q=80',
    categoryId: 'mesas',
  },
  {
    id: 'sala-jantar',
    name: 'Sala de Jantar',
    description: 'Mesas, cadeiras e buffets',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80',
    categoryId: 'mesas',
  },
  {
    id: 'area-externa',
    name: 'Área Externa',
    description: 'Móveis para jardim e varanda',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    categoryId: 'poltronas',
  },
];

export const RoomGallery = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Ambientes Inspiradores</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Inspire-se em nossos projetos e encontre o estilo perfeito para sua casa
          </p>
        </div>

        <Carousel
          opts={{ align: 'start', loop: true }}
          plugins={[Autoplay({ delay: 5000 })]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {rooms.map((room) => (
              <CarouselItem key={room.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Link to={`/catalogo?categoria=${room.categoryId}`}>
                  <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-1">{room.name}</h3>
                      <p className="text-white/80 text-sm mb-3">{room.description}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-white/90 group-hover:gap-3 transition-all">
                        Explorar
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>
      </div>
    </section>
  );
};
