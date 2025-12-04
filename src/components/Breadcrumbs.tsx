import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const routeLabels: Record<string, string> = {
  catalogo: 'Catálogo',
  produto: 'Produto',
  carrinho: 'Carrinho',
  checkout: 'Checkout',
  auth: 'Entrar',
  'minha-conta': 'Minha Conta',
  sobre: 'Sobre Nós',
  'lista-desejos': 'Lista de Desejos',
  faq: 'Perguntas Frequentes',
  contato: 'Contato',
  blog: 'Blog',
  termos: 'Termos de Uso',
  privacidade: 'Política de Privacidade',
  admin: 'Admin',
  produtos: 'Produtos',
  pedidos: 'Pedidos',
  categorias: 'Categorias',
  estoque: 'Estoque',
};

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  const location = useLocation();

  const generatedItems: BreadcrumbItem[] =
    items ||
    (() => {
      const pathSegments = location.pathname.split('/').filter(Boolean);
      const breadcrumbItems: BreadcrumbItem[] = [];

      pathSegments.forEach((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        const isLast = index === pathSegments.length - 1;
        const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

        breadcrumbItems.push({
          label,
          href: isLast ? undefined : href,
        });
      });

      return breadcrumbItems;
    })();

  if (generatedItems.length === 0) return null;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              to="/"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">Início</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {generatedItems.map((item, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            {item.href ? (
              <BreadcrumbLink asChild>
                <Link
                  to={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="text-foreground font-medium">{item.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
