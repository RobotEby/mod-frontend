import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  slug: string;
  image: string;
}

export const CategoryCard = ({ name, slug, image }: CategoryCardProps) => {
  return (
    <Link
      to={`/catalogo?categoria=${slug}`}
      className="group relative overflow-hidden rounded-lg aspect-[4/3] md:aspect-square"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-end p-3 md:p-6 md:justify-center">
        <h3 className="text-base md:text-2xl font-roboto-medium-bold text-background mb-0.5 md:mb-2 text-center">
          {name}
        </h3>
        <div className="flex items-center gap-1 text-background md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <span className="text-xs md:text-sm">Ver produtos</span>
          <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
        </div>
      </div>
    </Link>
  );
};
