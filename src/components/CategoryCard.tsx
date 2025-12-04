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
      className="group relative overflow-hidden rounded-lg aspect-square"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        <h3 className="text-2xl font-bold text-background mb-2 text-center">{name}</h3>
        <div className="flex items-center gap-2 text-background opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-sm">Ver produtos</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
};
