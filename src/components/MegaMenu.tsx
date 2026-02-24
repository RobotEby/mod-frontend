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
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent px-2 py-1 text-sm">
            Catálogo
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <div className="w-[88vw] max-w-[560px] p-3 sm:p-4 md:w-[560px]">
              <div className="mb-3">
                <Link
                  to="/catalogo"
                  className="text-sm font-roboto-semibold hover:text-primary transition-colors"
                >
                  Ver Todos os Produtos
                </Link>

                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                  Explore nossa coleção completa de móveis de alta qualidade
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {mockCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/catalogo?categoria=${category.id}`}
                    className="group block"
                  >
                    <div className="relative aspect-[16/10] rounded-md overflow-hidden border border-border bg-muted/30">
                      <img
                        src={category.image_url || ''}
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent" />

                      <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[11px] font-roboto-medium text-primary-foreground line-clamp-1">
                        {category.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-4 border-t pt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <Link
                  to="/catalogo?ofertas=true"
                  className="text-xs font-roboto-medium text-destructive hover:underline"
                >
                  Ofertas
                </Link>

                <Link
                  to="/catalogo?novo=true"
                  className="text-xs font-roboto-medium text-primary hover:underline"
                >
                  Novidades
                </Link>

                <Link
                  to="/catalogo"
                  className="text-xs font-roboto-medium text-muted-foreground hover:text-foreground transition-colors"
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
            'block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-xs font-roboto-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
