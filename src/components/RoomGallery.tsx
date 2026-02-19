import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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
    <section className="py-6 md:py-16">
      <div className="container px-4">
        <div className="text-center mb-4 md:mb-10">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-roboto-bold mb-1 md:mb-3">
            Ambientes Inspiradores
          </h2>
          <p className="text-xs md:text-base text-muted-foreground max-w-2xl mx-auto hidden sm:block">
            Inspire-se em nossos projetos e encontre o estilo perfeito para sua casa
          </p>
        </div>

        <Carousel opts={{ align: 'start', loop: true }} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {rooms.map((room) => (
              <CarouselItem
                key={room.id}
                className="pl-2 md:pl-4 basis-[80%] sm:basis-1/2 lg:basis-1/3"
              >
                <Link to={`/catalogo?categoria=${room.categoryId}`} className="group block">
                  <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                    <img
                      src={room.image}
                      alt={room.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
                      <h3 className="text-base md:text-xl font-roboto-bold text-background">
                        {room.name}
                      </h3>
                      <p className="text-xs text-background/70 hidden sm:block">
                        {room.description}
                      </p>
                      <div className="flex items-center gap-1 text-background/80 mt-1">
                        <span className="text-xs">Explorar</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
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
