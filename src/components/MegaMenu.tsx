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
    <NavigationMenu className="relative">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
            Catálogo
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <div className="w-[92vw] max-w-[720px] p-4 sm:p-5 md:w-[720px] md:p-6">
              <div className="mb-4 sm:mb-5">
                <Link
                  to="/catalogo"
                  className="text-base font-roboto-semibold hover:text-primary transition-colors sm:text-lg"
                >
                  Ver Todos os Produtos
                </Link>

                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  Explore nossa coleção completa de móveis de alta qualidade
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
                {mockCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/catalogo?categoria=${category.id}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] sm:aspect-square rounded-lg overflow-hidden border border-border bg-muted/30">
                      <img
                        src={category.image_url || ''}
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />

                      <span className="absolute bottom-2 left-2 right-2 text-xs font-roboto-medium text-primary-foreground sm:text-sm line-clamp-1">
                        {category.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-5 border-t pt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                <Link
                  to="/catalogo?ofertas=true"
                  className="text-sm font-roboto-medium text-destructive hover:underline"
                >
                  Ofertas
                </Link>

                <Link
                  to="/catalogo?novo=true"
                  className="text-sm font-roboto-medium text-primary hover:underline"
                >
                  Novidades
                </Link>

                <Link
                  to="/catalogo"
                  className="text-sm font-roboto-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Ver tudo →
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
          <div className="text-sm font-roboto-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
