import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { mockCategories } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export const MegaMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
            Catálogo
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[600px] p-6">
              <div className="mb-4">
                <Link
                  to="/catalogo"
                  className="text-lg font-semibold hover:text-primary transition-colors"
                >
                  Ver Todos os Produtos
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Explore nossa coleção completa de móveis de luxo
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {mockCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/catalogo?categoria=${category.id}`}
                    className="group block"
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-2 image-zoom">
                      <img
                        src={category.image_url || ''}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                      <span className="absolute bottom-2 left-2 text-sm font-medium text-primary-foreground">
                        {category.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t flex gap-6">
                <Link
                  to="/catalogo?ofertas=true"
                  className="text-sm font-medium text-destructive hover:underline flex items-center gap-1"
                >
                  Ofertas
                </Link>
                <Link
                  to="/catalogo?novo=true"
                  className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                >
                  Novidades
                </Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

interface ListItemProps extends React.ComponentPropsWithoutRef<'a'> {
  title: string;
}

const ListItem = ({ className, title, children, ...props }: ListItemProps) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
